<span class="mcl-back-button">[[Technology/Concept/index|← Concept]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - concept
  - knowledge
  - advance
  - javascript
---
# What is RegExp - Regular Expression

Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. In essential they main use to find/match character in many place (string, text, paragraph, etc...) using the RegExp syntax.

Example for JS:

```js
const regexp = /ab+c/ --- These would match (abc) - (abbc) - (abbbc) - (abcccc) - (aabc)
const regexp2 = /abc/ --- Only match (abc)
```

```js
const regexp = new RegExp("ab+c") --- These would match (abc) - (abbc) - (abbbc) - (abcccc) - (aabc)
const regexp2 = new RegExp("abc") --- Only match (abc)
```

## research related to RexExp -> edge cases

## overall view of RexExp in Javascript and python

## how to read, use cases and more on RexExp

## REF


```cardlink
url: https://www.honeybadger.io/blog/javascript-regular-expressions/
title: "The ultimate JavaScript regex guide"
description: "Regular expressions can be daunting, but they don't have to be! Learn everything you need about how to use a JavaScript regex with this guide."
host: www.honeybadger.io
favicon: https://www.honeybadger.io/favicon-32x32.png
image: https://og-image.honeybadger.io/image?template=article&title=The+ultimate+JavaScript+regex+guide&author=Adebayo+Adams&avatar=https%3A%2F%2Fwww-files.honeybadger.io%2Fauthors%2Fadebayoadams.png&date=2025-05-09
```


```cardlink
url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
title: "Regular expressions - JavaScript | MDN"
description: "Regular expressions are patterns used to match character combinations in strings.In JavaScript, regular expressions are also objects. These patterns are used with the exec() and test() methods of RegExp, and with the match(), matchAll(), replace(), replaceAll(), search(), and split() methods of String.This chapter describes JavaScript regular expressions. It provides a brief overview of each syntax element. For a detailed explanation of each one's semantics, read the regular expressions reference."
host: developer.mozilla.org
favicon: https://developer.mozilla.org/favicon.ico
```

