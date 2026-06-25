class CalendarCards {

    constructor() {
        this._cache = {};
        this._cacheTtlMs = 5 * 60 * 1000; // 5 minutes
    }

    _isCacheValid(key) {
        const entry = this._cache[key];
        if (!entry) return false;
        return (Date.now() - entry.timestamp) < this._cacheTtlMs;
    }

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

            const parseDate = (str) => {
                if (!str) return null;
                if (str.length === 8) {
                    return new Date(`${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`);
                }
                return new Date(
                    `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}T${str.slice(9, 11)}:${str.slice(11, 13)}:${str.slice(13, 15)}Z`
                );
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
            events.push({ title: summary, date: parseDate(dtstart), url });
        }

        return events.filter(e => e.date !== null);
    }

    parseDate(str) {
        if (!str) return null;

        // Date-only: YYYYMMDD
        if (str.length === 8) {
            return new Date(`${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`);
        }

        const y = str.slice(0, 4), mo = str.slice(4, 6), d = str.slice(6, 8);
        const h = str.slice(9, 11), mi = str.slice(11, 13), s = str.slice(13, 15);

        // Explicit UTC (ends with Z)
        if (str.endsWith("Z")) {
            return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}Z`);
        }

        // Floating/local time — treat as local, NOT UTC
        return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}`);
    };

    async fetchEvents(url) {
        if (this._isCacheValid(url)) {
            console.log("CalendarCards: cache hit");
            return this._cache[url].data;
        }

        try {
            const { requestUrl } = require("obsidian");
            const r = await requestUrl({ url });
            const data = this.parseICS(r.text);

            this._cache[url] = { data, timestamp: Date.now() };
            console.log("CalendarCards: fetched & cached");
            return data;
        } catch (e) {
            console.log("CalendarCards fetch error", e);
            return [];
        }
    }

    getDaysLabel(date) {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const eventStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const diffDays = Math.round((eventStart - todayStart) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "today";
        if (diffDays === 1) return "tomorrow";
        return `in ${diffDays} days`;
    }

    renderSection(container, title, emoji, accentClass, events, windowMs) {
        const now = new Date();
        const cutoff = new Date(now.getTime() + windowMs);
        const filtered = events
            .filter(e => e.date >= now && e.date <= cutoff)
            .sort((a, b) => a.date - b.date);

        if (filtered.length === 0) return false;

        const card = container.createEl("div", { cls: `cal-card ${accentClass}` });

        const header = card.createEl("div", { cls: "cal-card-header" });
        header.setText(`${emoji}  ${title}`);

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

        return true; // had events
    }

    // Convenience: render meetings + holidays with separator
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