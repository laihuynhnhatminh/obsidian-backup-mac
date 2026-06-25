<span class="mcl-back-button">[[Technology/Knowledge Vault/Setup New Machine/index|← Setup New Machine]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#configurations #tools 
## 1. Install NVM for Windows

**Download and Install nvm-windows:**

```powershell
# Using winget (recommended)
winget install CoreyButler.NVMforWindows

# Or download from GitHub releases
# https://github.com/coreybutler/nvm-windows/releases
```

**After installation, restart your terminal/PowerShell**

## 2. Configure and Use NVM

**Basic NVM commands:**

```powershell
# List available Node.js versions
nvm list available

# Install latest LTS version
nvm install lts

# Install specific version
nvm install 18.17.0
nvm install 20.5.0

# List installed versions
nvm list

# Use specific version
nvm use 18.17.0

# Set default version
nvm alias default 18.17.0

# Check current version
node --version
npm --version
```

**Recommended setup:**

```powershell
# Install current LTS (recommended for most projects)
nvm install 20.17.0
nvm use 20.17.0

# Install previous LTS (for older projects)
nvm install 18.20.4

# Set current LTS as default
nvm use 20.17.0
```

## 3. Install Yarn

**After installing Node.js via NVM:**

```powershell
# Install Yarn globally
npm install -g yarn

# Verify installation
yarn --version
```

## 4. Install pnpm

```powershell
npm install -g pnpm
```

## 5. Package Manager Configuration

**Configure npm:**

```powershell
# Set registry (if needed)
npm config set registry https://registry.npmjs.org/

# Set init defaults
npm config set init.author.name "Your Name"
npm config set init.author.email "your.email@example.com"
npm config set init.license "MIT"

# View current config
npm config list
```

**Configure Yarn:**

```powershell
# Set registry (if needed)
yarn config set registry https://registry.npmjs.org/

# Enable Yarn Berry (v2+) globally (optional)
yarn set version berry

# View config
yarn config list
```

**Configure pnpm:**

```powershell
# Set registry (if needed)
pnpm config set registry https://registry.npmjs.org/

# Set store directory (optional)
pnpm config set store-dir "C:\pnpm-store"

# View config
pnpm config list
```
## 6. Performance Tips

**pnpm optimizations:

```powershell
# Enable shamefully-hoist for better compatibility
pnpm config set shamefully-hoist true

# Set concurrent installation limit
pnpm config set network-concurrency 16

# Enable side-effects cache
pnpm config set side-effects-cache true
```

**Global package management:**

```powershell
# List global packages for each manager
npm list -g --depth=0
yarn global list
pnpm list -g

# Useful global packages to install
pnpm add -g typescript
pnpm add -g nodemon
pnpm add -g serve
pnpm add -g create-react-app
pnpm add -g @vue/cli
pnpm add -g vite
```

## 10. Troubleshooting

**Common issues and fixes:**

```powershell
# Clear npm cache
npm cache clean --force

# Clear yarn cache
yarn cache clean

# Clear pnpm store
pnpm store prune

# Reset npm permissions (if needed)
npm config delete prefix
npm config delete cache

# Reinstall packages
rm package-lock.json
rm yarn.lock
rm pnpm-lock.yaml
rm -r node_modules
pnpm install
```
