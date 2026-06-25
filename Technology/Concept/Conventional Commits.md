<span class="mcl-back-button">[[Technology/Concept/index|← Concept]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
created:
  - 2024-11-21
tags:
  - skills
  - knowledge
  - principle
  - conventions
  - git
  - version_control
---

---
## ❗ Why Conventional Commits

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with [SemVer](http://semver.org/), by describing the features, fixes, and breaking changes made in commit messages.

The commit message should be structured as follows:

---

```git
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. **fix:** a commit of the _type_ `fix` patches a bug in your codebase (this correlates with [`PATCH`](http://semver.org/#summary) in Semantic Versioning).
2. **feat:** a commit of the _type_ `feat` introduces a new feature to the codebase (this correlates with [`MINOR`](http://semver.org/#summary) in Semantic Versioning).
3. **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with [`MAJOR`](http://semver.org/#summary) in Semantic Versioning). A BREAKING CHANGE can be part of commits of any _type_.
4. _types_ other than `fix:` and `feat:` are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommends `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
5. _footers_ other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

Additional types are not mandated by the Conventional Commits specification, and have no implicit effect in Semantic Versioning (unless they include a BREAKING CHANGE). A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., `feat(parser): add ability to parse arrays`.

## 🏆 Summary



## 📦 Information Resources

```cardlink
url: https://www.conventionalcommits.org/en/v1.0.0/
title: "Conventional Commits"
description: "A specification for adding human and machine readable meaning to commit messages"
host: www.conventionalcommits.org
```

# 🔰 Blog post ->  
A blog post is like a conversation, you need to explain the information however you must only speak about subjects you understand and like. 
## 1️⃣ Intro 
* A promise statement 
* A preview of what's to come 
## 2️⃣ Overview 
* A simple definition 
* Examples 
## 📃 Steps 
* Detail of each the steps 
# ✅ Checklist Inspiration
- [ ] Brainstorm the topics that I want to write about in bullet points 
- [ ] Reorder those bullet points to create a line of thought Draft
- [ ] Expand those bullet points into sentences/text
- [ ] Draft 5 titles and pick one
- [ ] Revise the complete text for typos and any rephrasing that need to be made 
- [ ] Publish or schedule the post
- [ ] Promote