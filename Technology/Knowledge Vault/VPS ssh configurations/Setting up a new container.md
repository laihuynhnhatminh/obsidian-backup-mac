<span class="mcl-back-button">[[Technology/Knowledge Vault/VPS ssh configurations/index|← VPS ssh configurations]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - ssh
  - container
  - docker
  - ubuntu
  - azure
  - aws
  - gcp
  - digital_ocean
  - configurations
  - linux
---
# New Server Setup — From Fresh VPS to Deploy-Ready

Applies to: DigitalOcean Droplets, AWS EC2, Azure VMs, GCP Compute Engine, Hetzner, etc.
Assumes: Ubuntu 22.04+ (adjust package commands for other distros)

---

## 1. First Login (as root)

Cloud providers give you root access on first boot, either via:
- A root password (emailed or set in dashboard)
- An SSH key you attached during provisioning

```bash
ssh root@your-server-ip
```

> ⚠️ Don't stay as root. The next step creates a real user and you stop using root after that.

---

## 2. Create a Non-Root User

```bash
adduser minh                        # creates user + home dir, prompts for password
usermod -aG sudo minh               # give sudo privileges
```

Verify it worked:

```bash
groups minh
# should include: minh sudo
```

---

## 3. Set Up SSH for the New User

While still logged in as root, copy root's authorized keys to the new user:

```bash
rsync --archive --chown=minh:minh ~/.ssh /home/minh
```

This copies your existing public key so you can SSH in as `minh` immediately.

> If you want to add a *different* key (e.g. from another machine), see [[Adding a new SSH to existing user]].

Test in a **new terminal** before closing your root session:

```bash
ssh minh@your-server-ip
sudo whoami                         # should return: minh
```

---

## 4. Harden SSH

Edit the SSH daemon config:

```bash
sudo nano /etc/ssh/sshd_config
```

Change or confirm these values:

```
PermitRootLogin no                  # disable root SSH login
PasswordAuthentication no           # ssh/keys only, no passwords
PubkeyAuthentication yes
```

Restart SSH to apply:

```bash
sudo systemctl restart ssh
```

> ⚠️ Don't close your current session before testing a new SSH login works. If you lock yourself out, use the cloud provider's recovery console.

---

## 5. Configure the Firewall

Ubuntu uses `ufw` (Uncomplicated Firewall):

```bash
sudo ufw allow OpenSSH              # always do this first or you'll lock yourself out
sudo ufw allow 80                   # HTTP
sudo ufw allow 443                  # HTTPS
sudo ufw enable
sudo ufw status
```

Open extra ports as needed per service:

```bash
sudo ufw allow 5432                 # PostgreSQL (only if exposing externally — avoid if possible)
sudo ufw allow 6379                 # Redis (same warning)
```

> **Rule of thumb:** only expose what the outside world needs. DB ports should stay internal — access them through Docker networking, not public ports.

Config idle connection timeout:
- Set `ClientAliveInterval 60` in `/etc/ssh/sshd_config` (Freezes after exactly N minutes)

> **The idea** is to avoid ssh connection inside the cli lagged or being timeout during installation or running certain things

---

## 6. System Updates

```bash
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
```

Optionally enable automatic security updates:

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

---

## 7. Install Docker

```bash
# Remove any old versions
sudo apt remove docker docker-engine docker.io containerd runc

# Install dependencies
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the Docker repo
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine + Compose plugin
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verify:

```bash
docker --version
docker compose version
```

---

## 8. Add Your User to the Docker Group

By default, only root can run Docker. Fix that:

```bash
sudo usermod -aG docker minh
```

Then **log out and back in** for the group change to take effect:

```bash
exit
ssh minh@your-server-ip
docker ps                           # should work without sudo
```

> **Why this matters:** without this, every `docker` command needs `sudo`. That's annoying and breaks some CI/CD setups.

---

## 9. Directory Structure for Apps

A consistent layout makes management easier:

```bash
sudo mkdir -p /opt/apps
sudo chown minh:minh /opt/apps
```

Each app/service gets its own folder:

```
/opt/apps/
├── portfolio/
│   ├── docker-compose.yml
│   └── .env
├── api-python/
│   ├── docker-compose.yml
│   └── .env
```

> `/opt` is the conventional Linux location for third-party apps. Avoid deploying into home directories on servers.

---

## 10. Environment & Secrets

Never hardcode secrets. Use `.env` files per service:

```bash
touch /opt/apps/my-service/.env
chmod 600 /opt/apps/my-service/.env   # owner read/write only
nano /opt/apps/my-service/.env
```

Reference in `docker-compose.yml`:

```yaml
services:
  api:
    env_file:
      - .env
```

---

## 11. Verify the Server is Ready

Quick checklist before deploying anything:

```bash
# User and sudo
whoami && sudo whoami

# SSH hardening
sudo sshd -T | grep -E "permitrootlogin|passwordauthentication"

# Firewall
sudo ufw status

# Docker
docker ps
docker compose version

# Disk space
df -h

# Memory
free -h
```

---

## Permissions Cheatsheet - [[Linux Permission Cheat sheet]]

| What | Command | Why |
|---|---|---|
| Create user | `adduser username` | sets up home dir properly |
| Give sudo | `usermod -aG sudo username` | |
| Docker access | `usermod -aG docker username` | run docker without sudo |
| SSH dir | `chmod 700 ~/.ssh` | SSH requirement |
| authorized_keys | `chmod 600 ~/.ssh/authorized_keys` | SSH requirement |
| .env files | `chmod 600 .env` | secrets stay private |

---

## Common Gotchas

- **Group changes don't apply until re-login** — always `exit` and SSH back in after `usermod -aG`
- **UFW blocks everything by default** — add SSH rule before enabling or you lock yourself out
- **`sudo systemctl restart sshd` with bad config = lockout** — always test SSH in a new terminal first
- **Don't expose DB ports publicly** — use Docker internal networking; only your app containers should talk to the DB
- **Cloud providers may have their own firewall too** (e.g. AWS Security Groups, DO Cloud Firewall) — UFW and cloud firewall are separate layers, both need to allow the port

---

## Related Notes
- [[Adding a new SSH to existing user]]
- [[Linux Permission Cheat sheet]]