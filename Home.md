---
banner: "https://wallpaperaccess.com/full/1217172.jpg"
banner_lock: true
---
```dataviewjs
const MEETINGS_ICS = "https://calendar.google.com/calendar/ical/nhatminhwork1996%40gmail.com/private-66c291aa98c4691571c69b661bdc081f/basic.ics";
const HOLIDAYS_ICS = "https://calendar.google.com/calendar/ical/en.japanese%23holiday%40group.v.calendar.google.com/public/basic.ics";
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

const { CalendarCards } = customJS;

await CalendarCards.renderCalendarSection(dv.container, MEETINGS_ICS, HOLIDAYS_ICS, TWO_WEEKS_MS);
```

> [!multi-column]
>
>> [!note]+ Main Navigation
>> ```dataviewjs
>> const folder = dv.current().file.folder; const pages = dv.pages(`"${folder}"`); const nestedIndexes = pages.filter(p => { if (p.file.name !== "index") return false; if (p.file.folder === folder) return false; const relative = p.file.folder.slice(folder.length + 1); return !relative.includes("/"); }); dv.list(nestedIndexes.map(p => dv.fileLink(p.file.path, false, p.file.folder.split("/").pop()) ));
>> ```
>
>> [!computer]+ Tech Resources 
>> ```dataviewjs
>> const folder = "Technology"; const pages = dv.pages(`"${folder}"`); const nestedIndexes = pages.filter(p => {if (p.file.name !== "index") return false; if (p.file.folder === folder) return false;
  const relative = p.file.folder.slice(folder.length + 1); return !relative.includes("/"); }); dv.list(nestedIndexes.map(p => dv.fileLink(p.file.path, false, p.file.folder.split("/").pop())));
>> ```

---

> [!multi-column]
>
>> [!note]+ Recently Updated
>> ```dataviewjs
>> const pages = dv.pages()
  .filter(p => p.file.name !== "index")
  .sort(p => p.file.mtime, "desc")
  .slice(0, 10); dv.list(pages.map(p => p.file.link));
>> ```
>
>> [!warning]+ Recently Created
>> ```dataviewjs
>> dv.list(dv.pages().filter(p => p.file.name !== "index").sort(p => p.file.ctime, "desc").slice(0, 10).map(p => p.file.link));
>> ```
>
>> [!todo]+ Quick links
>> - [[To Do List Overall]]
>> - [[To Learn List - 2026]]

---
## Upcoming Events (2 months) 

```dataviewjs
const MEETINGS_ICS = "https://calendar.google.com/calendar/ical/nhatminhwork1996%40gmail.com/private-66c291aa98c4691571c69b661bdc081f/basic.ics";
const HOLIDAYS_ICS = "https://calendar.google.com/calendar/ical/en.japanese%23holiday%40group.v.calendar.google.com/public/basic.ics";
const TWO_MONTHS = 62 * 24 * 60 * 60 * 1000;

const { CalendarCards } = customJS;

await CalendarCards.renderCalendarSection(dv.container, MEETINGS_ICS, HOLIDAYS_ICS, TWO_MONTHS);
```

