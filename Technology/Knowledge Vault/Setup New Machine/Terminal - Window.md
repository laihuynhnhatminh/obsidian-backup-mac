<span class="mcl-back-button">[[Technology/Knowledge Vault/Setup New Machine/index|← Setup New Machine]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#cli #setup #configurations 
## 1. Install Windows Terminal

**From Microsoft Store:**

- Open Microsoft Store and search for "Windows Terminal" and install it
- Also install Window Package Manager

## 2. Install PowerShell 7+

**Using winget (recommended):**

```powershell
winget install Microsoft.PowerShell
```
## 3. Setup Git

- Go here [[Git]] and do the setup
## 4. Install Oh My Posh

**Install Oh My Posh:**

```powershell
winget install JanDeDobbeleer.OhMyPosh
```

**Install a Nerd Font (required for icons):**

```powershell
oh-my-posh font install
```

Choose a font like "Meslo LGM NF" or "FiraCode Nerd Font"

## 5. Configure PowerShell Profile

**Create/Edit PowerShell Profile:**

```powershell
notepad $PROFILE
```

**Add to your profile:**

```powershell
# Initialize Oh My Posh
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\jandedobbeleer.omp.json" | Invoke-Expression
```

## 6. Configure Windows Terminal

**Open Windows Terminal Settings (Ctrl + ,):**

**Set PowerShell 7 as default:**

- Go to Startup → Default profile
- Select "PowerShell 7.x.x"

**Configure the font:**

- Go to Profiles → PowerShell
- Appearance → Font face → Select your Nerd Font
- Set font size (usually 10-12)

**Optional color scheme:**

- Appearance → Color scheme → Choose one you like

## 7. Choose and Configure Oh My Posh Theme

**Browse available themes:**

```powershell
Get-PoshThemes
```

**Popular themes to try:**

- `jandedobbeleer` (default)
- `paradox`
- `powerlevel10k_rainbow`
- `atomic`

**Change theme in your profile:**

```powershell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\paradox.omp.json" | Invoke-Expression
```