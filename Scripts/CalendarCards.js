class CalendarCards {
    // ── ICS Parsing ──────────────────────────────────────────
    parseICS(text) {
        const events = [];
        const unfolded = text.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
        const blocks = unfolded.split("BEGIN:VEVENT");

        for (let i = 1; i < blocks.length; i++) {
            const b = blocks[i];

            const get = (key) => {
                const m = b.match(new RegExp(`${key}[^:]*:([^\\r\\n]+)`));
                return m ? m[1].trim() : null;
            };

            const extractMeetUrl = (block) => {
                const descMatch = block.match(/DESCRIPTION[^:]*:([^\r\n]+)/);
                if (!descMatch) return null;
                const desc = descMatch[1].replace(/\\n/g, "\n").replace(/\\,/g, ",");
                const meetMatch = desc.match(/https:\/\/meet\.google\.com\/[^\s>\\]+/);
                if (meetMatch) return meetMatch[0];
                const anyUrl = desc.match(/https?:\/\/[^\s>\\]+/);
                return anyUrl ? anyUrl[0] : null;
            };

            const dtstart = get("DTSTART");
            const summary = get("SUMMARY");
            if (!dtstart || !summary) continue;

            const url = extractMeetUrl(b) ?? get("URL") ?? null;
            events.push({ title: summary, date: this.parseDate(dtstart), url });
        }

        return events.filter(e => e.date !== null);
    }

    parseDate(str) {
        if (!str) return null;

        if (str.length === 8) {
            return new Date(`${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`);
        }

        const y = str.slice(0, 4), mo = str.slice(4, 6), d = str.slice(6, 8);
        const h = str.slice(9, 11), mi = str.slice(11, 13), s = str.slice(13, 15);

        if (str.endsWith("Z")) {
            return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}Z`);
        }

        return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}`);
    }

    async fetchEvents(url) {
        try {
            const r = await customJS.ObsidianFetcher.request(url, { cached: true, cachedKey: url });

            if (!r) {
                console.warn(`CalendarCards: failed to fetch ${url}`);
                return [];
            }

            const data = this.parseICS(r.text);
            return data;
        } catch (e) {
            console.log("CalendarCards fetch error", e);
            return [];
        }
    }

    // ── Helpers ──────────────────────────────────────────────

    getDaysLabel(date) {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const eventStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const diffDays = Math.round((eventStart - todayStart) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "today";
        if (diffDays === 1) return "tomorrow";
        return `in ${diffDays} days`;
    }

    // ── Rendering ────────────────────────────────────────────

    renderSection(container, title, emoji, accentClass, events, windowMs) {
        const now = new Date();
        const cutoff = new Date(now.getTime() + windowMs);
        const filtered = events
            .filter(e => e.date >= now && e.date <= cutoff)
            .sort((a, b) => a.date - b.date);

        if (filtered.length === 0) return false;

        const card = container.createEl("div", { cls: `cal-card ${accentClass}` });
        card.createEl("div", { cls: "cal-card-header", text: `${emoji}  ${title}` });

        for (const ev of filtered) {
            const row = card.createEl("div", { cls: "cal-card-row" });
            const left = row.createEl("div");

            const titleRow = left.createEl("div", { cls: "cal-card-title-row" });
            titleRow.createEl("span", { cls: "cal-card-title", text: ev.title });

            if (ev.url) {
                const link = titleRow.createEl("a", { cls: "cal-card-link", text: "🔗 Join", href: ev.url });
                link.setAttribute("target", "_blank");
            }

            const dateStr = ev.date.toLocaleDateString("en-AU", {
                weekday: "short", month: "short", day: "numeric",
                hour: "2-digit", minute: "2-digit"
            });
            left.createEl("div", { cls: "cal-card-date", text: dateStr });

            const daysLabel = this.getDaysLabel(ev.date);
            const isUrgent = daysLabel === "today" || daysLabel === "tomorrow";
            row.createEl("div", {
                cls: `cal-badge${isUrgent ? " is-urgent" : ""}`,
                text: daysLabel
            });
        }

        return true;
    }

    renderTasksSection(container, dv, days = 5) {
        const now = new Date();
        const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

        const tasks = dv.pages()
            .file.tasks
            .where(t => !t.completed && t.due)
            .where(t => {
                const due = new Date(t.due);
                return due >= now && due <= cutoff;
            })
            .sort(t => t.due);

        if (tasks.length === 0) return false;

        const card = container.createEl("div", { cls: "cal-card accent-red" });
        card.createEl("div", { cls: "cal-card-header", text: "⚠️  Due soon" });

        for (const task of tasks) {
            const row = card.createEl("div", { cls: "cal-card-row" });
            const left = row.createEl("div");

            const titleRow = left.createEl("div", { cls: "cal-card-title-row" });
            const taskLink = titleRow.createEl("a", { cls: "cal-card-title", text: task.text });
            taskLink.setAttribute("href", task.path);
            taskLink.onclick = (e) => {
                e.preventDefault();
                app.workspace.openLinkText(task.path, "", false);
            };

            const due = new Date(task.due);
            const dateStr = due.toLocaleDateString("en-AU", {
                weekday: "short", month: "short", day: "numeric"
            });
            left.createEl("div", { cls: "cal-card-date", text: `📄 ${task.path}  —  ${dateStr}` });

            const daysLabel = this.getDaysLabel(due);
            const isUrgent = daysLabel === "today" || daysLabel === "tomorrow";
            row.createEl("div", {
                cls: `cal-badge${isUrgent ? " is-urgent" : ""}`,
                text: daysLabel
            });
        }

        return true;
    }

    // ── Convenience ──────────────────────────────────────────

    async renderCalendarSection(container, meetingsUrl, holidaysUrl, windowMs) {
        const [meetings, holidays] = await Promise.all([
            this.fetchEvents(meetingsUrl),
            this.fetchEvents(holidaysUrl)
        ]);

        const now = new Date();
        const cutoff = new Date(now.getTime() + windowMs);
        const hasMeetings = meetings.some(e => e.date >= now && e.date <= cutoff);
        const hasHolidays = holidays.some(e => e.date >= now && e.date <= cutoff);

        if (hasMeetings) {
            this.renderSection(container, "Incoming Meetings", "📅", "accent-blue", meetings, windowMs);
        }

        if (hasHolidays) {
            this.renderSection(container, "Public Holidays", "🎌", "accent-amber", holidays, windowMs);
        }

        if (hasMeetings || hasHolidays) {
            container.createEl("hr");
        }
    }
}