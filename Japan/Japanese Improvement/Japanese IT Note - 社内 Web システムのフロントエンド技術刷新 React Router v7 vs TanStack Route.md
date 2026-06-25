<span class="mcl-back-button">[[Japan/Japanese Improvement/index|← Japanese Improvement]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - japanese
---

```cardlink
url: https://medium.com/eureka-engineering/社内-web-システムのフロントエンド技術刷新-react-router-v7-vs-tanstack-router-db11d92c5be3
title: "社内 Web システムのフロントエンド技術刷新: React Router v7 vs. TanStack Router"
description: "この記事は、「Pairs Engineering Advent Calendar 2024」24 日目の記事です。"
host: medium.com
favicon: https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19
image: https://miro.medium.com/v2/resize:fit:1200/1*Uzby0P-VC6CYX_GbC3xoMw.jpeg
```


| 日本語  | 日本語のいみ       | 英語                                                                                                                                                                                                               | 他   |
| ---- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| 物心つく | ものごころつく      | become old enough to understand what's going on around oneself (of a child, etc.)                                                                                                                                |     |
| 迎える  | むかえる         | To receive, to welcome, to greet, to salute, to hail, to reach, to approach, to enter (a phase, era, etc.)                                                                                                       |     |
| 基盤   | きばん          | Bedrock, Substrate (circuit board), Foundation, Basis, Infrastructure                                                                                                                                            |     |
| 検討   | けんとう         | Consideration, examination, investigation, study, scrutiny, discussion, analysis                                                                                                                                 |     |
| 刷新   | さっしん         | Reform, renovation                                                                                                                                                                                               |     |
| 背景   | はいけい         | Backing, support (from behind the scenes)<br>Background, scenery, backdrop, setting, circumstance, context                                                                                                       |     |
| 知見   | ちけん          | Expertise, experience, knowledge                                                                                                                                                                                 |     |
| 蓄積   | ちくせき         | Accumulation, accumulate, store                                                                                                                                                                                  |     |
| 置き換え | おきかえ         | Replacement, substitute, displacement, transposition, reset                                                                                                                                                      |     |
| 主流   | しゅりゅう        | Main course (of a river), main stream<br>Mainstream, commonplace                                                                                                                                                 |     |
| 柔軟性  | じゅうなんせい      | Flexibility, pliability, softness, elasticity                                                                                                                                                                    |     |
| 際に   | さいに          | In case of, at that time, at this time                                                                                                                                                                           |     |
| 用いる  | もちいる         | To use, to make use of, to utilize, to utilise                                                                                                                                                                   |     |
| 噴出   | ふんしゅつ        | Spewing, gushing, spouting, eruption, effusion                                                                                                                                                                   |     |
| 代替   | だいたい<br>だいがえ | Alternative, substitute<br>Substitution, alternation                                                                                                                                                             |     |
| 試みる  | こころみる        | To try, to attempt, to have a go (at something)                                                                                                                                                                  |     |
| 比較   | ひかく          | Comparison                                                                                                                                                                                                       |     |
| 省く   | はぶく          | To curtail, to save, to cut down, to economize, to economise<br>To omit, to leave out, to exclude, to eliminate                                                                                                  |     |
| 階層構造 | かいそうこうぞう     | Layered structure (NextJS directory structure for example)                                                                                                                                                       |     |
| 赴く   | おもむく<br>おもぶく | To become, to face (facts, circumstances, etc.)<br>To abide by, to agree to, to consent to, to obey<br>To go in the direction of, to proceed toward, to proceed according to, to repair to, to betake oneself to |     |
| 改善   | かいぜん         | Kaizen (Japanese business philosophy of continuous improvement)<br>Betterment, improvement                                                                                                                       |     |
| 特殊   | とくしゅ         | Special, particular, peculiar, unique                                                                                                                                                                            |     |
| 記法   | きほう          | Notation                                                                                                                                                                                                         |     |
| 一筋   | ひとすじ         | A single bloodline<br>Ordinary, common<br>Earnest, resolute, intent, devoted<br>One long straight object (e.g. strand of hair, beam of light, wisp of smoke)                                                     |     |
| 特徴   | とくちょう        | Feature, trait, characteristic, peculiarity, distinction                                                                                                                                                         |     |
| 一致   | いっち          | Conformity, consistency<br>Cooperation<br>Coincidence, agreement, union, match                                                                                                                                   |     |
| 重視   | じゅうし         | Importance, stress, serious consideration<br>To take something seriously, to attach importance, to stress                                                                                                        |     |
| 親和性  | しんわせい        | Affinity                                                                                                                                                                                                         |     |
| 関数   | かんすう         | Function (Programming)                                                                                                                                                                                           |     |
| 引数   | ひきすう         | Argument (Programming)                                                                                                                                                                                           |     |
| 湧く   | わく           | To appear (esp. suddenly) (sweat, tears, etc.)<br>To feel emotions form (joy, bravery, etc.)<br>To hatch (esp. of parasitic insects, etc.)<br>To well (up), to gush forth (of water), to spring out, to surge    |     |
| 慌てる  | あわてる         | To be in a hurry, to rush<br>To become confused (disconcerted, disorganized, disorganised), to be flustered, to panic                                                                                            |     |
| 補完   | ほかん          | Complementation, supplementation, completion                                                                                                                                                                     |     |
| 雛形   | ひながた         | Model; miniature; pattern<br>Sample; specimen<br>Prescribed form                                                                                                                                                 |     |
| 付与   | ふよ           | Grant, allowance, endowment, bestowal, assignment, conferment                                                                                                                                                    |     |
| 候補   | こうほ          | Candidacy, candidature, nomination<br>Candidate, contender, prospect, pick, choice, list                                                                                                                         |     |
| 模索   | もさく          | Groping (for), exploring for a solution                                                                                                                                                                          |     |
| 行き着く | ゆきつく<br>いきつく | To arrive at, to end up                                                                                                                                                                                          |     |
| 末に   | すえに          | At the end (of)<br>Finally, after, following                                                                                                                                                                     |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
|      |              |                                                                                                                                                                                                                  |     |
