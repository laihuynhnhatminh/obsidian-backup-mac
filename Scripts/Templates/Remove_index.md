<%*
const vault = app.vault;
const files = vault.getFiles();

const indexFiles = files.filter(f => f.name === "index.md");

if (indexFiles.length === 0) {
  new Notice("No index files found.");
  return;
}

const confirm = await tp.system.suggester(
  [`Yes, delete all ${indexFiles.length} index files`, "Cancel"],
  [true, false]
);

if (!confirm) {
  new Notice("Cancelled.");
  return;
}

let deleted = 0;
for (const file of indexFiles) {
  await vault.trash(file, true);
  deleted++;
}

new Notice(`🗑️ Deleted ${deleted} index files.`);
%>