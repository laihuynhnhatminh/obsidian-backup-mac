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

const affected = [];
for (const file of eligible) {
  const content = await vault.read(file);
  if (content.includes("mcl-back-button")) {
    affected.push(file);
  }
}

if (affected.length === 0) {
  new Notice("No files with back button found.");
  return;
}

const confirm = await tp.system.suggester(
  [`Yes, remove from ${affected.length} files`, "Cancel"],
  [true, false]
);

if (!confirm) {
  new Notice("Cancelled.");
  return;
}

let updated = 0;

for (const file of affected) {
  const content = await vault.read(file);

  const cleaned = content.replace(
    /(<span class="mcl-back-button">\[\[.*?\]\]<\/span>\s*)+\n\n---\n\n/,
    ""
  );

  if (cleaned === content) continue;

  await vault.modify(file, cleaned);
  updated++;
}

new Notice(`✅ Back button removed from ${updated} files.`);
%>