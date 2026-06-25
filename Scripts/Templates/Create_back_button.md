<%*
const vault = app.vault;
const files = vault.getFiles();

const shouldExclude = (file) => {
  const parts = file.path.split("/");
  if (file.name === "index.md") return true;
  if (parts.length === 1) return true;
  if (file.path.startsWith("Scripts/")) return true;
  if (file.name.includes(".excalidraw")) return true;
  return false;
};

const eligible = files.filter(f => f.extension === "md" && !shouldExclude(f));

const confirm = await tp.system.suggester(
  [`Yes, update ${eligible.length} files`, "Cancel"],
  [true, false]
);

if (!confirm) {
  new Notice("Cancelled.");
  return;
}

let updated = 0;

for (const file of eligible) {
  const content = await vault.read(file);
  if (content.includes("mcl-back-button")) continue;

  const folderPath = file.parent.path;
  const folderName = folderPath.split("/").pop();
  const indexPath = `${folderPath}/index`;

  const navBlock = `<span class="mcl-back-button">[[${indexPath}|← ${folderName}]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>\n\n---\n\n`;

  let newContent;
  const hasFrontmatter = content.startsWith("---");
  if (hasFrontmatter) {
    const closingIndex = content.indexOf("---", 3);
    if (closingIndex !== -1) {
      const afterFrontmatter = closingIndex + 3;
      newContent = content.slice(0, afterFrontmatter) + "\n\n" + navBlock + content.slice(afterFrontmatter).trimStart();
    } else {
      newContent = navBlock + content;
    }
  } else {
    newContent = navBlock + content;
  }

  await vault.modify(file, newContent);
  updated++;
}

new Notice(`✅ Back button added to ${updated} files.`);
%>