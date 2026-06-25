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
## Prerequisites
- You have SSH access to the container from at least one machine already
- You know the target username on the container (e.g. `minh` or `your-email`), or if not create new user here [[Create a user inside container]]

---

## Step 1 — Generate a key pair on the new machine
```bash
ssh-keygen -t ed25519 -C "minh-macbook-home"
```

- Accept the default path (`~/.ssh/id_ed25519`) or give it a name
- Set a passphrase — don't skip it

---

## Step 2 — Get the public key
```bash
cat ~/.ssh/id_ed25519.pub
```

---

## Step 3 — Add the key to the droplet user

### Option A — From an existing machine with SSH access

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub minh@your-droplet-ip
```

### Option B — Via Container Recovery Console Or Existing Container

Refer here to review permission: [[Linux Permission Cheat sheet]]

```bash
su - minh                                       # switch to the target user
mkdir -p ~/.ssh                                 # to make an .ssh folder if this is a new initialized user
ls ~/.ssh -a                                    # go and look at the specific folder incase           
chmod 700 ~/.ssh                                # set only that the owner can do anything here
echo "ssh-ed25519 AAAA..." >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys                # set the authorized_keys so that only the owner can read and write (no execution)
```

> ⚠️ If you're root and paste the key as root, it goes to `/root/.ssh/` — not the target user's. Always `su - username` first.

---

## Step 4 — Test from the new machine
```bash
ssh minh@your-droplet-ip
```

Keep your existing session open until this works.

---

## Step 5 — Set up SSH config (optional but recommended)

On the new machine, add to `~/.ssh/config`:

```
Host do-droplet
HostName your-droplet-ip
User minh
IdentityFile ~/.ssh/id_ed25519
```

Now you can just run:
```bash
ssh do-droplet
```

---

## Permissions Cheatsheet

| Path | Permission |
|---|---|
| `~/.ssh/` | `700` |
| `~/.ssh/authorized_keys` | `600` |
| `~/.ssh/id_ed25519` (private) | `600` |
| `~/.ssh/id_ed25519.pub` (public) | `644` |

Wrong permissions = SSH silently rejects the key.

## Related Notes
- [[Create a user inside container]]
- [[Linux Permission Cheat sheet]]