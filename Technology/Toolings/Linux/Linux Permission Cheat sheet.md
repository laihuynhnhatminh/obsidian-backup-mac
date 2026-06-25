<span class="mcl-back-button">[[Technology/Toolings/Linux/index|← Linux]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - linux
  - cli
  - configurations
---
# Linux File & Folder Permissions — Cheat Sheet

---

## The Basics

Every file/folder has three permission groups:

```
-  rwx  rwx  rwx
^  ^    ^    ^
|  |    |    └── others (everyone else)
|  |    └─────── group
|  └──────────── owner (user)
└─────────────── type: (-) file, (d) directory, (l) symlink
```

Each group has three bits:

|Symbol|Name|On file|On directory|
|---|---|---|---|
|`r`|read|view file contents|list contents (`ls`)|
|`w`|write|edit file|create/delete files inside|
|`x`|execute|run as program|enter directory (`cd`)|

---

## Numeric (Octal) Notation

Each permission is a number:

|#|Permission|
|---|---|
|`7`|rwx (full)|
|`6`|rw- (read + write)|
|`5`|r-x (read + execute)|
|`4`|r-- (read only)|
|`0`|--- (none)|

Three digits = owner / group / others:

```
chmod 755 myfolder
#     ^^^
#     ||└── others: r-x (5)
#     |└─── group:  r-x (5)
#     └──── owner:  rwx (7)
```

---


## Common Permission Patterns

|Chmod|Who can do what|Use for|
|---|---|---|
|`700`|owner: full, nobody else|private dirs, SSH keys dir|
|`600`|owner: read+write, nobody else|`.env`, private keys, `authorized_keys`|
|`644`|owner: read+write, others: read|public files, static assets|
|`755`|owner: full, others: read+execute|public dirs, executables|
|`750`|owner: full, group: read+execute|app dirs shared with a group|
|`400`|owner: read only|sensitive files you shouldn't accidentally edit|

---

## Common Commands

### chmod — change permissions

```bash
chmod 755 myfolder                  # set exact permissions
chmod +x script.sh                  # add execute for everyone
chmod -w file.txt                   # remove write for everyone
chmod u+x script.sh                 # add execute for owner only
chmod go-rwx secret.txt             # remove all access from group + others
chmod -R 755 myfolder               # recursive (apply to all contents)
```

Targets: `u` = user/owner, `g` = group, `o` = others, `a` = all

### chown — change owner

```bash
chown minh file.txt                 # change owner
chown minh:minh file.txt            # change owner + group
chown minh:docker file.txt          # owner: minh, group: docker
chown -R minh:minh /opt/apps        # recursive
```

### chgrp — change group only

```bash
chgrp docker /var/run/docker.sock   # change group only
chgrp -R www-data /var/www          # recursive
```

### ls -l — inspect permissions

```bash
ls -la /opt/apps
# drwxr-xr-x  3 minh minh 4096 Jan 15 10:30 apps
# ^            ^ ^    ^
# |            | |    └── group
# |            | └─────── owner
# |            └───────── link count
# └────────────────────── permissions
```

---

## Real-World Scenarios

### App deployment directory

```bash
sudo mkdir -p /opt/apps/my-service
sudo chown minh:minh /opt/apps/my-service
chmod 755 /opt/apps/my-service
```

### .env file (secrets)

```bash
touch .env
chmod 600 .env                      # only you can read/write
```

### SSH directory

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_ed25519         # private key
chmod 644 ~/.ssh/id_ed25519.pub     # public key
```

### Make a script executable

```bash
chmod +x deploy.sh
# or
chmod 755 deploy.sh
```

### Shared folder between users

```bash
sudo groupadd devteam
sudo usermod -aG devteam minh
sudo usermod -aG devteam deploy-bot
sudo chown -R minh:devteam /opt/shared
chmod -R 770 /opt/shared            # owner + group: full, others: none
```

### Docker socket access (add user to docker group)

```bash
sudo usermod -aG docker minh
# log out and back in to apply
```

---

## Special Permissions (good to know)

|Permission|Octal|What it does|
|---|---|---|
|Sticky bit|`+t` / `1xxx`|Only file owner can delete it (used on `/tmp`)|
|Setuid|`+s` on file|File runs as its owner, not the caller|
|Setgid|`+s` on dir|New files inside inherit the directory's group|

```bash
chmod +t /tmp                       # sticky bit
chmod g+s /opt/shared               # setgid on shared dir — new files inherit group
```

Setgid on a shared directory is useful when multiple users write to the same folder — files automatically belong to the shared group without manual chown.

---

## Quick Diagnosis

```bash
# Who am I and what groups am I in?
whoami && groups

# Why can't I access this file?
ls -la /path/to/file

# Who owns this process?
ps aux | grep myapp

# Check effective permissions
namei -l /opt/apps/my-service       # shows permissions at every level of the path
```

> ⚠️ `namei -l` is underrated — if a parent directory blocks access, even a `777` file inside won't be reachable. Always check the full path.

---

## Gotchas

- **Recursive chmod on `/`** — never run `chmod -R` without a specific path. `chmod -R 777 /` destroys your system.
- **Execute on directories** — without `x`, you can't `cd` into a dir even if you have `r`. Both are needed to browse.
- **Group changes need re-login** — `usermod -aG` doesn't take effect until the user logs out and back in.
- **Docker files** — files created inside a container are owned by the container's user (often root). On the host, you may need to `chown` them after copying out.
- **Check the whole path** — a file can be `777` but unreachable if any parent folder blocks you. Use `namei -l`.