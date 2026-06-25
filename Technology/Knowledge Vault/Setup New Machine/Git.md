<span class="mcl-back-button">[[Technology/Knowledge Vault/Setup New Machine/index|← Setup New Machine]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#git #configurations 
## Install using winget:

```powershell
winget install Git.Git
```

**Setup Git for use**

```bash
# Set your identity
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# For Windows users working with Linux/Mac teams
git config --global core.autocrlf true

# Alternative: Use input mode for more control
# git config --global core.autocrlf input

# Ensure consistent line endings
git config --global core.eol lf

# Push current branch to same-named branch on origin
git config --global push.default current

# Alternative: Set upstream tracking automatically
git config --global push.autoSetupRemote true

# For Git 2.37+: automatically set upstream when pushing
git config --global --add --bool push.autoSetupRemote true

# Colorful output 
git config --global color.ui auto
git config --global color.branch auto
git config --global color.diff auto
git config --global color.status auto

# Better branch sorting 
git config --global branch.sort -committerdate 

# Rebase by default when pulling 
git config --global pull.rebase true

# Automatically prune deleted remote branches 
git config --global fetch.prune true

# Case sensitivity (important for cross-platform)
git config --global core.ignorecase false

# Better whitespace handling
git config --global core.whitespace trailing-space,space-before-tab
git config --global apply.whitespace error-if-no-change

# Working with remotes 
git config --global alias.sync "!git fetch --all && git pull" 
git config --global alias.pub "!git push -u origin \$(git branch --show-current)"
```

## SSH Key Setup

- Advance setup [[SSH key config - Window]] or [[SSH key config - Mac]]

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard (Windows)
clip < ~/.ssh/id_ed25519.pub
```

## Verify Your Configuration

```bash
# View all global config
git config --global --list

# Test your setup
git --version
git config user.name
git config user.email
```

## Update git with multiple account access

- Quick test for current github config (github-personal is just the hostname in config in .ssh, default would be pure `git` )

```bash
git remote -v
ssh -T git@github-personal
```

- Setting remote of the git file with the configuration of the account example:

```bash
git remote set-url origin git@github-personal:laihuynhnhatminh/python-todo-list.git
```
