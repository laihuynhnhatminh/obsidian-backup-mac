---
type: index
title: 
created: 2026-06-16
banner: https://images4.alphacoders.com/753/thumb-1920-753150.png
banner_lock: true
---

<span class="mcl-back-button">[[Technology/Topic to learn/index|← Projects]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---

```dataviewjs
const folder = dv.current().file.folder;
const pages = dv.pages(`"${folder}"`);

const files = pages.filter(p =>
  p.file.folder === folder && p.file.name !== "index"
);

const nestedIndexes = pages.filter(p => {
  if (p.file.name !== "index") return false;
  if (p.file.folder === folder) return false;
  const relative = p.file.folder.slice(folder.length + 1);
  return !relative.includes("/");
});

const container = dv.container;

const style = document.createElement("style");
style.textContent = `
  .mcl-section { border: 1px solid var(--background-modifier-border); border-radius: 8px; padding: 12px 16px; background: var(--background-secondary); margin-bottom: 12px; }
  .mcl-section-title { font-size: 14px; font-weight: 600; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid var(--background-modifier-border); display: flex; align-items: center; gap: 6px; color: var(--text-normal); }
  .mcl-section ul { list-style: none; margin: 0; padding: 0; }
  .mcl-section ul li { padding: 2px 0; font-size: 14px; }
  .mcl-section ul li p { margin: 0; }
`;
container.appendChild(style);

function renderSection(parent, title, icon, items, linkFn) {
  if (items.length === 0) return;

  const section = parent.createDiv({ cls: "mcl-section" });
  const titleEl = section.createDiv({ cls: "mcl-section-title" });
  titleEl.innerHTML = `<span>${icon}</span><span>${title}</span>`;
  const ul = section.createEl("ul");

  for (const p of items) {
    const li = ul.createEl("li");
    const temp = dv.container.createDiv({ attr: { style: "display:none" } });
    dv.paragraph(linkFn(p), { container: temp, component: dv.component });
    li.appendChild(temp.firstChild);
  }
}

renderSection(container, "Files", "📄", files, (p) => p.file.link);

renderSection(container, "Folders", "📁", nestedIndexes, (p) => {
  const folderName = p.file.folder.split("/").pop();
  return dv.fileLink(p.file.path, false, folderName);
});
```
