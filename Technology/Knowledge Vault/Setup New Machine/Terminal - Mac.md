<span class="mcl-back-button">[[Technology/Knowledge Vault/Setup New Machine/index|← Setup New Machine]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#cli #configurations #mac_os
## 1. Install iTerm2 (Recommended) or Use Built-in Terminal

**Install iTerm2 (recommended):**

- Download from [https://iterm2.com/](https://iterm2.com/)
- Or use Homebrew: `brew install --cask iterm2`

**Also install Homebrew (Package Manager):**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 2. Setup Git

- Go here [[Git]] and do the setup

## 3. Install Oh My Posh

**Install Oh My Posh:**

```bash
brew install jandedobbeleer/oh-my-posh/oh-my-posh
```

**Install a Nerd Font (required for icons):**

```bash
oh-my-posh font install
```

Choose a font like "Meslo LGM NF" or "FiraCode Nerd Font"

## 4. Configure Shell Profile

**For Zsh (recommended - default on macOS):**

```bash
# Edit Zsh profile
nano ~/.zshrc
```

**Add to your ~/.zshrc:**

```bash
# Initialize Oh My Posh
eval "$(oh-my-posh init zsh --config $(brew --prefix oh-my-posh)/themes/jandedobbeleer.omp.json)"
```

## 5. Configure iTerm2 or Terminal

**For iTerm2:**

- Open iTerm2 → Preferences (Cmd + ,)
- Go to Profiles → Text
- Font → Select your Nerd Font
- Set font size (usually 12-14)
- Optional: Profiles → Colors → Choose a color scheme

**Set Zsh as default (if not already):**

```bash
chsh -s /bin/zsh
```

## 6. Choose and Configure Oh My Posh Theme

**Browse available themes:**

```bash
oh-my-posh get shell
```

**Popular themes to try:**

- `jandedobbeleer` (default)
- `paradox`
- `powerlevel10k_rainbow`
- `atomic`

**Change theme in your profile:**

**For Zsh (~/.zshrc):**

```bash
eval "$(oh-my-posh init zsh --config $(brew --prefix oh-my-posh)/themes/paradox.omp.json)"
```

## 7. Reload Your Configuration

**For Zsh:**

```bash
source ~/.zshrc
```
