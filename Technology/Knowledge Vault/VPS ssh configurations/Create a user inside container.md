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
Add a new user

```bash
adduser minh                        # creates user + home dir, prompts for password
usermod -aG sudo minh               # give sudo privileges
```

Verify it worked:

```bash
groups minh
# should include: minh sudo

```

While still logged in as root, copy root's authorized keys to the new user:

```bash
rsync --archive --chown=minh:minh ~/.ssh /home/minh
```

This copies your existing public key so you can SSH in as `minh` immediately.

> If you want to add a *different* key (e.g. from another machine), see [[Adding a new SSH to existing user]].

Test in a **new terminal** before closing your root session:

```bash
ssh minh@your-server-ip
sudo whoami                         # should return: root
```

## Related Notes
- [[Adding a new SSH to existing user]]