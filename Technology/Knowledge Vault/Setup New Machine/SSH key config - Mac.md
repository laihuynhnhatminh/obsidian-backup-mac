<span class="mcl-back-button">[[Technology/Knowledge Vault/Setup New Machine/index|← Setup New Machine]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#ssh #configurations #mac_os 
## 1. SSH Config File Location on macOS

**File path:**

```
~/.ssh/config
```

**Or full path:**

```
/Users/yourusername/.ssh/config
```

## 2. Create and Set Up SSH Directory

```bash
# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh

# Set proper permissions (critical for security)
chmod 700 ~/.ssh
```

## 3. Generate Different SSH Keys for Different Services

```bash
# GitHub key
ssh-keygen -t ed25519 -f ~/.ssh/id_github -C "your.email@example.com"

# Work GitHub/GitLab
ssh-keygen -t ed25519 -f ~/.ssh/id_work -C "work.email@company.com"

# Personal servers/containers
ssh-keygen -t ed25519 -f ~/.ssh/id_servers -C "servers-key"

# Development containers
ssh-keygen -t ed25519 -f ~/.ssh/id_containers -C "containers-key"

# Set proper permissions for private keys
chmod 600 ~/.ssh/id_*
chmod 644 ~/.ssh/id_*.pub
```

## 4. Create SSH Config File

**Create/edit `~/.ssh/config`:**

```bash
# Using vim
vim ~/.ssh/config

# Or using nano
nano ~/.ssh/config

# Or using VS Code
code ~/.ssh/config
```

## 5. SSH Config File for macOS

```ssh
# Default settings for all hosts
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentitiesOnly yes
    ServerAliveInterval 60
    ServerAliveCountMax 10
    
# GitHub Personal
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github
    UseKeychain yes
    AddKeysToAgent yes
    PreferredAuthentications publickey

# GitHub Work (using alias)
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_work
    UseKeychain yes
    AddKeysToAgent yes
    PreferredAuthentications publickey

# GitLab Personal
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_github
    UseKeychain yes
    AddKeysToAgent yes
    PreferredAuthentications publickey

# GitLab Work
Host gitlab-work
    HostName gitlab.company.com
    User git
    IdentityFile ~/.ssh/id_work
    Port 22
    UseKeychain yes
    AddKeysToAgent yes
    PreferredAuthentications publickey

# Personal VPS/Cloud Server
Host myserver
    HostName your-server-ip-or-domain.com
    User your-username
    IdentityFile ~/.ssh/id_servers
    Port 22
    UseKeychain yes
    AddKeysToAgent yes

# Development containers (Docker, etc.)
Host dev-container
    HostName localhost
    User root
    IdentityFile ~/.ssh/id_containers
    Port 2222
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
    UseKeychain yes
    AddKeysToAgent yes

# AWS EC2 instances
Host aws-*
    User ec2-user
    IdentityFile ~/.ssh/id_servers
    StrictHostKeyChecking no
    UseKeychain yes
    AddKeysToAgent yes

# Specific AWS instance
Host aws-web-server
    HostName ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com
    User ec2-user
    IdentityFile ~/.ssh/aws-web-key.pem
    UseKeychain yes
    AddKeysToAgent yes

# Jump host setup (bastion server)
Host bastion
    HostName bastion.company.com
    User your-username
    IdentityFile ~/.ssh/id_work
    Port 22
    UseKeychain yes
    AddKeysToAgent yes

Host internal-server
    HostName 10.0.1.100
    User admin
    IdentityFile ~/.ssh/id_work
    ProxyJump bastion
    UseKeychain yes
    AddKeysToAgent yes

# Multiple GitHub accounts example
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github_personal
    UseKeychain yes
    AddKeysToAgent yes

Host github-company
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github_company
    UseKeychain yes
    AddKeysToAgent yes

# Docker containers with different ports
Host container-web
    HostName localhost
    User root
    IdentityFile ~/.ssh/id_containers
    Port 2201
    UseKeychain yes
    AddKeysToAgent yes

Host container-db
    HostName localhost
    User postgres
    IdentityFile ~/.ssh/id_containers
    Port 2202
    UseKeychain yes
    AddKeysToAgent yes

# macOS specific - Connect to another Mac
Host mac-mini
    HostName mac-mini.local
    User yourusername
    IdentityFile ~/.ssh/id_servers
    UseKeychain yes
    AddKeysToAgent yes

# Raspberry Pi or Linux devices on network
Host pi
    HostName raspberrypi.local
    User pi
    IdentityFile ~/.ssh/id_servers
    UseKeychain yes
    AddKeysToAgent yes
```

## 6. Add Keys to SSH Agent and Keychain

```bash
# Start SSH agent (usually runs automatically on macOS)
eval "$(ssh-agent -s)"

# Add keys to agent and keychain
ssh-add --apple-use-keychain ~/.ssh/id_github
ssh-add --apple-use-keychain ~/.ssh/id_work
ssh-add --apple-use-keychain ~/.ssh/id_servers
ssh-add --apple-use-keychain ~/.ssh/id_containers

# List added keys
ssh-add -l

# List keys with fingerprints
ssh-add -l -E sha256
```

## 7. Set Proper File Permissions

```bash
# Set permissions for SSH directory and files
chmod 700 ~/.ssh
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/id_*
chmod 644 ~/.ssh/id_*.pub
chmod 644 ~/.ssh/known_hosts
```

## 8. Configure SSH Agent to Start Automatically

**Add to your shell profile (`~/.zshrc` for macOS Catalina+):**

```bash
# SSH Agent auto-start
if [ -z "$SSH_AUTH_SOCK" ] ; then
    eval "$(ssh-agent -s)"
fi

# Auto-load SSH keys (optional - keys should load from keychain)
# ssh-add --apple-load-keychain 2>/dev/null
```

## 9. Shell Profile Integration

**Add to `~/.zshrc` (or `~/.bash_profile` if using Bash):**

```bash
# SSH convenience functions
ssha() {
    eval "$(ssh-agent -s)"
    ssh-add --apple-use-keychain ~/.ssh/id_github
    ssh-add --apple-use-keychain ~/.ssh/id_work
    ssh-add --apple-use-keychain ~/.ssh/id_servers
    ssh-add --apple-use-keychain ~/.ssh/id_containers
}

# Show SSH keys
alias sshlist='ssh-add -l'

# Show SSH keys with details
alias sshlist-detailed='ssh-add -l -E sha256'

# Copy public key to clipboard
cpkey() {
    if [ -z "$1" ]; then
        echo "Usage: cpkey <keyname>"
        echo "Available keys:"
        ls ~/.ssh/id_*.pub | sed 's/.*id_//' | sed 's/.pub//'
        return 1
    fi
    
    if [ -f ~/.ssh/id_$1.pub ]; then
        pbcopy < ~/.ssh/id_$1.pub
        echo "Public key for $1 copied to clipboard"
    else
        echo "Key ~/.ssh/id_$1.pub not found"
    fi
}

# Quick SSH config edit
alias sshedit='code ~/.ssh/config'
```

## 10. Usage Examples

**Clone with different GitHub accounts:**

```bash
# Personal GitHub
git clone git@github.com:username/repo.git

# Work GitHub (using alias)
git clone git@github-work:company/repo.git
```

**SSH into servers:**

```bash
# Connect to your server
ssh myserver

# Connect through jump host
ssh internal-server

# Connect to container
ssh dev-container

# Connect to Raspberry Pi
ssh pi
```

## 11. Testing Your Configuration

```bash
# Test GitHub connection
ssh -T git@github.com
ssh -T git@github-work

# Test server connections
ssh myserver 'echo "Connection successful"'

# Debug connection issues
ssh -v git@github.com

# Test keychain integration
ssh-add -l
```

## 12. Backup Your SSH Configuration

**Create a backup script (`~/bin/backup-ssh.sh`):**

```bash
#!/bin/bash
# Create backup
backup_date=$(date +%Y-%m-%d)
backup_dir="$HOME/ssh-backup-$backup_date"

mkdir -p "$backup_dir"
cp -r ~/.ssh/* "$backup_dir/"

echo "SSH configuration backed up to: $backup_dir"

# Optional: Create encrypted archive
# tar -czf "$HOME/ssh-backup-$backup_date.tar.gz" -C "$HOME" .ssh
```

Make it executable:

```bash
chmod +x ~/bin/backup-ssh.sh
```

## 13. Security Best Practices for macOS

```ssh
# Add to your config for better security
Host *
    PasswordAuthentication no
    PubkeyAuthentication yes
    ChallengeResponseAuthentication no
    Protocol 2
    Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
    MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com
    KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
    UseKeychain yes
    AddKeysToAgent yes
```

## 14. macOS-Specific Features

**Touch ID for SSH (macOS Monterey 12.3+):**

```bash
# Enable Touch ID for SSH
sudo vim /etc/pam.d/sudo
# Add this line at the top:
# auth sufficient pam_tid.so
```

**Network locations with different SSH configs:**

```bash
# Create location-specific configs
mkdir ~/.ssh/locations

# Work config
cp ~/.ssh/config ~/.ssh/locations/work

# Home config  
cp ~/.ssh/config ~/.ssh/locations/home

# Switch function
switch_ssh_config() {
    if [ -f ~/.ssh/locations/$1 ]; then
        cp ~/.ssh/locations/$1 ~/.ssh/config
        echo "Switched to $1 SSH configuration"
    else
        echo "Configuration $1 not found"
    fi
}
```

## 15. Integration with Git

**Configure Git for multiple accounts:**

```bash
# Global Git config
git config --global user.name "Your Name"
git config --global user.email "personal@email.com"

# Work directory config (run inside work repos)
git config user.email "work@company.com"
git remote set-url origin git@github-work:company/repo.git
```

## 16. Troubleshooting macOS SSH Issues

```bash
# Check SSH agent status
ssh-add -l

# Check keychain entries
security find-generic-password -s "SSH:"

# Clear and re-add keys
ssh-add -D
ssh-add --apple-use-keychain ~/.ssh/id_github

# Check SSH client version
ssh -V

# Verbose connection testing
ssh -vvv git@github.com
```