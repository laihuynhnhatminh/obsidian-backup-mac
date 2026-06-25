<span class="mcl-back-button">[[Technology/Knowledge Vault/Setup New Machine/index|← Setup New Machine]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#ssh #configurations 
## 1. SSH Config File Location on Windows

```
C:\Users\YourUsername\.ssh\config
```

**Or in PowerShell:**

```powershell
$env:USERPROFILE\.ssh\config
```

## 2. Create and Set Up SSH Directory

```powershell
# Create .ssh directory if it doesn't exist
mkdir $env:USERPROFILE\.ssh -Force

# Set proper permissions (important for security)
icacls "$env:USERPROFILE\.ssh" /inheritance:r /grant:r "$env:USERNAME:F"
```

## 3. Generate Different SSH Keys for Different Services

```powershell
# GitHub key
ssh-keygen -t ed25519 -f ~/.ssh/id_github -C "your.email@example.com"

# Work GitHub/GitLab
ssh-keygen -t ed25519 -f ~/.ssh/id_work -C "work.email@company.com"

# Personal servers/containers
ssh-keygen -t ed25519 -f ~/.ssh/id_servers -C "servers-key"

# Development containers
ssh-keygen -t ed25519 -f ~/.ssh/id_containers -C "containers-key"
```

## 4. Create SSH Config File

**Create/edit `~/.ssh/config`:**

```powershell
notepad $env:USERPROFILE\.ssh\config
```

## 5. SSH Config File Examples

```ssh
# Default settings for all hosts
Host *
    AddKeysToAgent yes
    IdentitiesOnly yes
    ServerAliveInterval 60
    ServerAliveCountMax 10

# GitHub Personal
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github
    PreferredAuthentications publickey

# GitHub Work (using alias)
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_work
    PreferredAuthentications publickey

# GitLab Personal
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_github
    PreferredAuthentications publickey

# GitLab Work
Host gitlab-work
    HostName gitlab.company.com
    User git
    IdentityFile ~/.ssh/id_work
    Port 22
    PreferredAuthentications publickey

# Personal VPS/Cloud Server
Host myserver
    HostName your-server-ip-or-domain.com
    User your-username
    IdentityFile ~/.ssh/id_servers
    Port 22

# Development containers (Docker, etc.)
Host dev-container
    HostName localhost
    User root
    IdentityFile ~/.ssh/id_containers
    Port 2222
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null

# AWS EC2 instances
Host aws-*
    User ec2-user
    IdentityFile ~/.ssh/id_servers
    StrictHostKeyChecking no

# Specific AWS instance
Host aws-web-server
    HostName ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com
    User ec2-user
    IdentityFile ~/.ssh/aws-web-key.pem

# Jump host setup (bastion server)
Host bastion
    HostName bastion.company.com
    User your-username
    IdentityFile ~/.ssh/id_work
    Port 22

Host internal-server
    HostName 10.0.1.100
    User admin
    IdentityFile ~/.ssh/id_work
    ProxyJump bastion

# Multiple GitHub accounts example
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github_personal

Host github-company
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github_company

# WSL/Container development
Host wsl
    HostName localhost
    User your-wsl-username
    IdentityFile ~/.ssh/id_containers
    Port 22

# Docker containers with different ports
Host container-web
    HostName localhost
    User root
    IdentityFile ~/.ssh/id_containers
    Port 2201

Host container-db
    HostName localhost
    User postgres
    IdentityFile ~/.ssh/id_containers
    Port 2202
```

## 6. Add Keys to SSH Agent

```powershell
# Start SSH agent (if not running)
Start-Service ssh-agent

# Add all your keys
ssh-add ~/.ssh/id_github
ssh-add ~/.ssh/id_work
ssh-add ~/.ssh/id_servers
ssh-add ~/.ssh/id_containers

# List added keys
ssh-add -l
```

## 7. Set Proper File Permissions

```powershell
# Set permissions for SSH directory and files
icacls "$env:USERPROFILE\.ssh" /inheritance:r /grant:r "$env:USERNAME:F"
icacls "$env:USERPROFILE\.ssh\*" /inheritance:r /grant:r "$env:USERNAME:R"
icacls "$env:USERPROFILE\.ssh\id_*" /inheritance:r /grant:r "$env:USERNAME:R"
```

## 8. Usage Examples

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
```

**Git configuration for multiple accounts:**

```bash
# For personal repos
git config user.email "personal@email.com"
git remote set-url origin git@github-personal:username/repo.git

# For work repos
git config user.email "work@company.com"
git remote set-url origin git@github-work:company/repo.git
```

## 9. PowerShell Profile Integration

**Add to your PowerShell profile:**

```powershell
# SSH convenience functions
function Start-SSHAgent {
    Start-Service ssh-agent
    ssh-add ~/.ssh/id_github
    ssh-add ~/.ssh/id_work
    ssh-add ~/.ssh/id_servers
}

function Show-SSHKeys {
    ssh-add -l
}

# Aliases
Set-Alias -Name ssha -Value Start-SSHAgent
Set-Alias -Name sshlist -Value Show-SSHKeys
```

## 10. Testing Your Configuration

```powershell
# Test GitHub connection
ssh -T git@github.com
ssh -T git@github-work

# Test server connections
ssh myserver 'echo "Connection successful"'

# Debug connection issues
ssh -v git@github.com
```

## 11. Backup Your SSH Configuration

**Create a backup script:**

```powershell
# Create backup
$backupDate = Get-Date -Format "yyyy-MM-dd"
Copy-Item -Path "$env:USERPROFILE\.ssh" -Destination "$env:USERPROFILE\ssh-backup-$backupDate" -Recurse
```

## 12. Security Best Practices

```ssh
# Add to your config for better security
Host *
    PasswordAuthentication no
    PubkeyAuthentication yes
    ChallengeResponseAuthentication no
    UsePAM no
    Protocol 2
    Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
    MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com
    KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
```