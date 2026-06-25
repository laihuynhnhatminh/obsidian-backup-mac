<span class="mcl-back-button">[[Technology/Knowledge Vault/Setup New Machine/index|← Setup New Machine]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#configurations #mac_os #tools 
## 1. Install NVM for macOS

**Install nvm using the official installer:**

```bash
# Download and install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Or using Homebrew (alternative)
brew install nvm
```

**Add to your shell profile (restart terminal after):**

```bash
# For Zsh (~/.zshrc) - default on macOS
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.zshrc

# Reload your shell
source ~/.zshrc
```

## 2. Configure and Use NVM

**Basic NVM commands:**

```bash
# List available Node.js versions
nvm ls-remote

# List available LTS versions
nvm ls-remote --lts

# Install latest LTS version
nvm install --lts

# Install specific version
nvm install 18.17.0
nvm install 20.5.0

# List installed versions
nvm ls

# Use specific version
nvm use 18.17.0

# Set default version
nvm alias default 20.17.0

# Check current version
node --version
npm --version
```
## 3. Install Yarn

```bash
# Install Yarn globally
npm install -g yarn

# Verify installation
yarn --version
```
## 4. Install pnpm

```bash
npm install -g pnpm
```
## 5. Shell Configuration

**Add to your Zsh profile (~/.zshrc):**

```bash
# Node.js development aliases
alias npmls='npm list --depth=0'
alias npmlsg='npm list -g --depth=0'

# Package manager shortcuts
alias pn='pnpm'
alias y='yarn'

# Quick project commands
alias dev='pnpm run dev'
alias build='pnpm run build'
alias start='pnpm run start'
alias test='pnpm run test'

# Node version info function
nodeinfo() {
    echo "Node.js: $(node --version)"
    echo "npm: $(npm --version)"
    echo "yarn: $(yarn --version)"
    echo "pnpm: $(pnpm --version)"
    echo "Current directory: $(pwd)"
}

# Quick nvm commands
alias nvmls='nvm ls'
nvmuse() {
    nvm use $1
}

# Auto-switch Node version when entering directory with .nvmrc
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

**Reload your shell:**

bash

```bash
source ~/.zshrc
```

## 6. Package Manager Configuration

**Configure npm:**

```bash
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

```bash
# Set registry (if needed)
yarn config set registry https://registry.npmjs.org/

# Enable Yarn Berry (v2+) globally (optional)
yarn set version berry

# View config
yarn config list
```

**Configure pnpm:**

```bash
# Set registry (if needed)
pnpm config set registry https://registry.npmjs.org/

# Set store directory (optional)
pnpm config set store-dir ~/Library/pnpm

# View config
pnpm config list
```


## 7. Performance Tips

**pnpm optimizations:**

```bash
# Enable shamefully-hoist for better compatibility
pnpm config set shamefully-hoist true

# Set concurrent installation limit
pnpm config set network-concurrency 16

# Enable side-effects cache
pnpm config set side-effects-cache true
```

**Global package management:**

```bash
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
pnpm add -g @nestjs/cli
```

## 8. Troubleshooting

**Common issues and fixes:**

```bash
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
rm -rf node_modules
pnpm install
```