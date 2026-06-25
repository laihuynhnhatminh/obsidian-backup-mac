<%*
const vault = app.vault;

const blogTitle = await tp.system.prompt("Blog title");
if (!blogTitle) {
  new Notice("Cancelled.");
  return;
}

const folderPath = `Blogs/${blogTitle}`;
const today = tp.date.now("YYYY-MM-DD");

const nav = `<span class="mcl-back-button">[[${folderPath}/index|← ${blogTitle}]]</span> <span class="mcl-back-button">[[Blogs/index|↑ Blogs]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>\n\n---\n\n`;
const indexNavButton = `<span class="mcl-back-button">[[Blogs/index|↑ Blogs]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>`;

const enContent = `---
title: ${blogTitle}
date: ${today}
tags:
  - blog
language: en
description: 
---

${nav}## Research & Knowledge

> Dump everything you know or found about this topic here.

## Explanation

> Simplify and clarify the core concepts before writing.

---

## Blog

### Introduction

### Body

### Conclusion
`;

const jaContent = `---
title: ${blogTitle}
date: ${today}
tags:
  - blog
status: draft
language: ja
description: 
---

${nav}## リサーチ・知識

> このトピックについて知っていること、調べたことをここにまとめる。

## 説明

> 書く前に、核心的な概念をシンプルに整理する。

---

## ブログ

### はじめに

### 本文

### おわりに
`;

const referenceContent = `---
title: ${blogTitle} - References
date: ${today}
tags:
  - blog
status: draft
---

${nav}## Articles & Docs

- 

## YouTube Videos

- 

## Other Links

- 
`;

const indexContent = `---
type: index
title: 
created: ${tp.date.now("YYYY-MM-DD")}
banner: https://images4.alphacoders.com/753/thumb-1920-753150.png
banner_lock: true
---

${indexNavButton}

---

\`\`\`dataviewjs
const folder = dv.current().file.folder;
const pages = dv.pages(\`"\${folder}"\`);

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
style.textContent = \`
  .mcl-section { border: 1px solid var(--background-modifier-border); border-radius: 8px; padding: 12px 16px; background: var(--background-secondary); margin-bottom: 12px; }
  .mcl-section-title { font-size: 14px; font-weight: 600; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid var(--background-modifier-border); display: flex; align-items: center; gap: 6px; color: var(--text-normal); }
  .mcl-section ul { list-style: none; margin: 0; padding: 0; }
  .mcl-section ul li { padding: 2px 0; font-size: 14px; }
  .mcl-section ul li p { margin: 0; }
\`;
container.appendChild(style);

function renderSection(parent, title, icon, items, linkFn) {
  if (items.length === 0) return;

  const section = parent.createDiv({ cls: "mcl-section" });
  const titleEl = section.createDiv({ cls: "mcl-section-title" });
  titleEl.innerHTML = \`<span>\${icon}</span><span>\${title}</span>\`;
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
\`\`\`
`;

try {
  await vault.createFolder(folderPath);
  await vault.create(`${folderPath}/index.md`, indexContent);
  await vault.create(`${folderPath}/${blogTitle} - en.md`, enContent);
  await vault.create(`${folderPath}/${blogTitle} - ja.md`, jaContent);
  await vault.create(`${folderPath}/${blogTitle} - reference.md`, referenceContent);

  new Notice(`✅ Blog "${blogTitle}" created!`);

  const enFile = vault.getAbstractFileByPath(`${folderPath}/${blogTitle}-en.md`);
  await app.workspace.getLeaf().openFile(enFile);
} catch (e) {
  new Notice(`❌ Error: ${e.message}`);
}
%>