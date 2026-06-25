<span class="mcl-back-button">[[Technology/Knowledge Vault/Setup New Machine/index|← Setup New Machine]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#cli #mac_os #configurations #tools
### Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.s
```
### Version Managers:

```bash
# Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Python Version Manager
brew install pyenv

# Ruby Version Manager (if needed)
brew install rbenv
```
### Development Managers:

```bash
# GitHub CLI
brew install gh

# Docker
brew install --cask docker

# Kubernetes CLI
brew install kubectl
```
### Network & Cloud Tools

```bash
# ngrok (tunneling)
brew install ngrok/ngrok/ngrok

# Cloudflare CLI
brew install cloudflare/cloudflare/cf

# AWS CLI
brew install awscli

# Azure CLI
brew install azure-cli

# Google Cloud CLI
brew install --cask google-cloud-sdk

# HTTPie (better curl)
brew install httpie

# Postman CLI
brew install --cask postman-cli
```
### DevOps & Infrastructure

```bash
# Terraform
brew install terraform

# Ansible (macOS only, use WSL on Windows)
brew install ansible

# Vagrant
brew install --cask vagrant

# SSH tools
brew install openssh
```
### Database CLIs

```bash
# Redis CLI
brew install redis

# PostgreSQL CLI
brew install postgresql

# MongoDB CLI
brew install mongosh

# MySQL CLI
brew install mysql
```