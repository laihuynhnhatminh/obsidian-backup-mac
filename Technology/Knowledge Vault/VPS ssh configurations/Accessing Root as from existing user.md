<span class="mcl-back-button">[[Technology/Knowledge Vault/VPS ssh configurations/index|← VPS ssh configurations]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - ssh
  - configurations
  - recovery
  - ubuntu
  - linux
---
# Accessing root through elevated permission

```sh
sudo -i          # elevate to root shell
whoami           # check current user
# do your root things
exit             # drop back to your normal user immediately
whoami           # final check
```

# Accessing through recovery console with `root` and `password`

- Last line of action if no way to recover this. We can access the container through `root` and `password` using recovery console (depends on the platform you are using)