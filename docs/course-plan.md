# SLOP2805 课程方案

> **v3 状态(实现完成后)。** v2 的规划已全部落地,以下三处与 v2 文本不同,以仓库为准:
> 上课日改为 **Lecture 周二 11:00 / Studio 周四 14:00**(v2 写反了,会让 W4/W7/W11 的练习早于讲授);
> A2 截止定为 **周二 2027-04-27 10:00**;页面数从 27 增至 **33 个内容页 + 2 个 deck**
> (新增 overview / calendar / readings / glossary / simulator)。
> 实施过程中的问题与验证记录在 [worklog.md](worklog.md)。



**v2 变更依据:**你在 v1 §7 三个取舍上的决定,加上 A2 截止周次、页数核实、W1/W10 对称三项追加要求。
v1 的取舍表已不再是待决项,移到 §9 决策记录。

---

## 1. 课程身份(已落到 `src/course-config.ts`)

| 项 | 值 |
|---|---|
| `code` | **`SLOP2805`**(保留分配的 `805`,首位 2 = ANU level 2) |
| `title` | `Still Loading: The Design of Progress Bars` |
| 中文别名(内部沟通用) | 卡在 99%:进度条的设计、时间与信任 |
| `session` / `year` | Semester 1 / 2027 |
| `startDate` – `endDate` | `2027-02-22` – `2027-05-28` |
| `tags` | `interface design` · `waiting` · `evidence` |
| `sessionLabels` | `Studio` / `Studios` |

### 课表:Lecture 周二 11:00,Studio 周四 14:00–17:00

**v1 是周二 studio、周四 lecture,v2 反过来了。** 原因是 v1 那个排法里,
lecture 落在同周 studio 之后 —— W4 的 studio(周二)会在 L2(周四)之前发生,
等于先做练习再讲概念。周二讲、周四做,教学才在同周内先于练习。

Tue/Thu 同时避开 2027 S1 全部三个周一公众假日:Canberra Day(3/8)、
Easter Monday(3/29)、ANZAC Day 顺延(4/26)。

| 周 | Lecture(周二) | Studio(周四) |
|---|---|---|
| 1 | **L1** 2/23 | 2/25 |
| 2 | — | 3/4 |
| 3 | — | 3/11 |
| 4 | **L2** 3/16 | 3/18 |
| 5 | — | 3/25 |
| 6 | — | 4/1 |
| | *休两周* | |
| 7 | **L3** 4/20 | 4/22 |
| 8 | — | 4/29 |
| 9 | — | 5/6 |
| 10 | — | 5/13 |
| 11 | **L4** 5/18 | 5/20 |
| 12 | — | 5/27(showcase) |

---

## 2. 课程简介(英文,已上线)

首页正文见 `src/pages/index.astro`。声音定调:**deadpan-sincere** —— 笑点在于
选题之窄,不在语气。整站不许出现自嘲式玩笑。

> Every upload bar you have ever watched was lying to you, and most of them were
> lying for good reasons.

首页另有一节 **What this course is not**,三条明确划界(不是泛 UX、不是心理学、
不是"让用户感觉更好"),用来把范围钉死。

**v2 修正:**首页原正文第一句与 `course-config` 的 `description` 逐字重复,
相隔两段。已删。这是读渲染页面发现的,任何检查都看不见。

---

## 3. 学习成果

LO1–LO3 同 v1。**LO4 按你的要求重写**,去掉任何与人数挂钩的含义:

| ID | 表述 |
|---|---|
| **LO1** | **Trace** each claim a waiting interface makes — a percentage, a time, a word, a motion — to the event in the underlying process that could support it, and mark the ones that have no possible source. |
| **LO2** | **Implement** a file-upload waiting interface that behaves correctly under known duration, unknown duration, stall, timeout, disconnection, cancellation and retry, using a local simulator. |
| **LO3** | **Audit and repair** a waiting interface's keyboard path, status text and reduced-motion behaviour against a stated checklist, recording failures as failures. |
| **LO4** | **Justify** a design decision from evidence you actually gathered, and **state a conclusion no stronger than that evidence supports** — including deciding, with reasons, not to change anything. |

### 对应关系已写进 frontmatter,并由检查强制

每个 studio 和每个 assessment 的 `outcomes:` 字段就是对齐表本身。
`spec/course-shape.test.ts` 断言:**assessment 声明的每一个 LO,都有一个日期
早于其 `due` 的 studio 教过它**。

| LO | 教学周 | 考核 |
|---|---|---|
| LO1 | 1, 2, 3, 5, 10, 12 | A1 A2 A3 |
| LO2 | 2, 4, 5, 6, 8, 9, 12 | A2 A3 |
| LO3 | 7, 8, 9, 11, 12 | A2 A3 |
| LO4 | 1, 5, 6, 10, 11, 12 | A1 A3 |

> LO4 挂在 W1 上是有实据的:W1 的第三个判定 `not determinable from outside`
> 和 L1 收尾那条"不得断言超过证据"就是 LO4 的前半。否则 A1 的 "Honesty of
> limits"(20 分)就会变成先考后教 —— 这一点是被检查逼出来的,不是我想起来的。

---

## 4. 四场 lecture:各自承担什么,以及前后如何接

按你的要求,每场明确"承担的概念任务 / 依赖什么 / 接到哪里"。四场页面上都写了这三段。

| | L1 · W1 | L2 · W4 | L3 · W7 | L4 · W11 |
|---|---|---|---|---|
| **题目** | What 99% Promises | Saying Nothing, Precisely | Reading an Interface Without Looking at It | Three People Is Not a Study |
| **承担的概念** | 全课唯一的分析动作:claim → source event → verdict;三个判定;模拟器为何是认识论工具而非便利 | 「不知道多久」与「无话可说」之分;liveness / elapsed / named stage 三种诚实register;**分数可读性陷阱** | 状态作为文本与语义而非图像;无值时的 ARIA;live region 洪泛;**reduced-motion 当诊断工具用** | 存在性证明 vs 比率;记录行为而非解读;精确指名样本偏差;**「证据不支持改动」是结论不是失败** |
| **依赖** | 无(首场) | W2 状态词汇、W3 分母是可数事件 | W4 三种 register、W6 三种动效 —— 本周检验它们是信息还是气氛 | W6 的弱结果体感、W10 的 claims register |
| **接到** | W1 studio、W2、W3、W10 | W4 studio、W5(镜像情形)、W7、W8 | W7 studio 审计工作坊、**A2 的 25 分**、W8/W9 | W11 studio、**A3 的 20 分**、W12 辩护 |
| **有 deck** | ✅ `/decks/week-01/`,8 张 | | | |

### 其余八周怎么接(这是"不能只删掉 lecture"的那部分)

W2、W3、W5、W6、W8、W9、W10、W12 每周 studio **开场 20–25 分钟具名框架讲解 + 指定阅读**,
写在各自页面的 *In the room* 表里,不是笼统的"自学"。被搬进 studio 框架的概念:

| 周 | 框架讲解承担的概念 | 支撑哪个评分点 |
|---|---|---|
| 2 | 状态与转移;进度条的一个阶段不是一个状态;"done" 从字节声明变成持久化声明 | A1 *State reading* 25 |
| 3 | 分母及其静默排除项 | A2 *Behaviour* 条件 (a) |
| 5 | 三类估计器各自对未来的假设 | A2 *Behaviour* 条件 (b) |
| 6 | 感知时长的已发表结论实际测了什么;二十人教室能与不能复现什么 | A3 *Evaluation* 的对照 |
| 8 | 故障分类学;三段式文案结构(发生了什么 / 对文件意味着什么 / 接下来怎样) | A3 *Behaviour* 30 |
| 9 | 保证(guarantee)怎么写才可能失败;断言当前行为的测试如何保护 bug | A3 *Behaviour* 30 |
| 10 | 向内转:现在能确立什么、失去了哪个判定;"kept with reason" 与借口之别 | A3 *Claims register* 25 |
| 12 | 辩护的规则 | A3 *Defence* 10 |

**核对结论:三项考核的每一条评分准则,都能指到一场 lecture 或一次具名 studio 框架讲解。**
没有任何准则悬空在被删掉的 lecture 上。

---

## 5. 共用起始件 `upload-ui` 与阶段检查点

全班从同一个**故意做坏**的上传界面开始:两个状态,其中一个是假的;99% 停十一秒后静默失败。

**可恢复起点。** 仓库带 `stage-01` … `stage-11` 标签。第 N 周没做完的人
`git checkout stage-N` 就能参加第 N+1 周,不会一周掉队整学期掉队。

**检查点是地板,不是答案。** 每个 stage 只恢复下一周所需的**机制**,并把其中每一个
判断都留空 —— 例如 `stage-02` 给出会发出具名事件的模拟器,但里面**没有**状态枚举,
因为状态枚举就是那周的练习。这条写在每个 studio 页的 *If you are joining late* 一节里,
措辞统一:**"It is a floor, not an answer."**

诊断、取舍和解释始终是学生的:没有任何一周的 brief 给出目标状态数、指定估计器、
或规定动效方案。W2 页面明写:*"a defensible five beats an imitated nine."*

---

## 6. 三项考核(20 / 30 / 50 = 100)

### A1 — Progress Bar Autopsy · 20% · week 3 · due **Fri 12 Mar 2027 17:00 AEDT**

只考 **W1–W2**。W3 的分母内容同周并行,但归 A2 考 —— 所以没有任何内容是"当周教、当周考"。

| 准则 | 权重 |
|---|---|
| Evidence tracing | 40 |
| State reading | 25 |
| Honesty of limits | 20 |
| Clarity | 15 |

明确不给分:修复方案、重设计、心理学解释。

### A2 — Waiting Interface Prototype · 30% · week 8 · due **Tue 27 Apr 2027 10:00 AEST**

**v2 按你的要求从 W7 挪到第 8 周初。实际日期是这样定出来的:**

- 最后一次相关教学 = W7 studio 审计工作坊,**周四 4/22**;
- 第 8 周的异常状态 studio 在**周四 4/29** —— 截止日必须在它之前且不占用它;
- 周一 4/26 是 ANZAC Day 顺延公众假日,不适合设截止;
- ⇒ **周二 4/27 10:00**。距最后教学 5 天,跨一个周末加一个公众假日,
  且当天**没有课**,第 8 周 studio 一分钟没被占用。

**"提前发材料"不计作已教。** Checklist v0 在 W2 发布,页面上写死了它的身份:
*"It is a notice, not a lesson. Nothing this week teaches you how to meet it,
and nothing this week is marked against it."* 教学是 W7,第一次带分是 A2。
`spec/course-shape.test.ts` 检查的是 **studio 日期**,不是公告日期。

评分要求在 A2 页面上提前固定,四种情形 + 审计表逐条列明:

| 准则 | 权重 |
|---|---|
| Behaviour across the four conditions | 35 |
| Evidence discipline | 25 |
| Accessibility audit | 25 |
| Both viewports | 15 |

### A3 — Honest Waiting Kit · 50% · week 12 · showcase Thu 27 May · due **Fri 28 May 2027 17:00 AEST**

| 准则 | 权重 |
|---|---|
| Behaviour under abnormal conditions | 30 |
| Claims register | 25 |
| Evaluation and revision | 20 |
| Accessibility and both viewports | 15 |
| Defence | 10 |

**Evaluation and revision(20)按你的要求重写,评的是"结论与证据是否相称":**

> Marks here do not depend on how many people you observed, whether you observed
> anybody at all, or how many changes you made. A well-argued decision to change
> nothing scores as highly as a change.

第 12 周不是从零写作:state reference 来自 W2/W8,claims register 是 W10 的 studio 产出,
evaluation record 是 W11 的 studio 产出。第 12 周只做组装与辩护。

---

## 7. W11:课内三人互测 + 等量替代任务

- **课内完成。**周四 4 人一组轮转,三轮观察 + 三轮被观察,每轮 15 分钟。
  **课程时间本身就是招募**,不要求课外找人。
- 课程提供:任务脚本、知情同意语句(每轮开始前朗读)、记录表、轮转时间。
- **替代任务:structured walkthrough。**不想参与(无论作为观察者还是被试,
  **不需要给理由**)的人课前告知助教即可。同一份任务脚本,对着书面状态集逐步走查,
  每步的预期读数在看界面之前先写下来。
  - **同等评分,同一条准则,不是缩水任务。**
  - 硬约束写在页面上:*"It is not evidence about people, and a walkthrough
    written up as though somebody had been watched is the one way to actually
    lose marks here."*
- **"钉死 3 处改动"已按你的要求改为:提出 3 项有证据支持的处理决定,实际修改最多 3 处。**
  页面列出三种都合法的决定:改 / 不改并说明理由 / 不改但写明什么实验能定论。
  并明写:*"Three changes is a ceiling, not a target."*
- 探索性质写死在页面上:三人足以证明**某事会发生**(存在性),
  永远不足以说**多常发生**(比率);"two of three" 是房间里的计数,不是比率。

---

## 8. 网站页面清单(从构建产物核实,非估算)

`find dist -name index.html` 的实际结果:**27 个内容页** + deck + 404。
27 不是凑出来的,是"12 studio + 4 lecture + 3 assessment + 4 个索引 + 首页 + 2 人 + policies"的结果。

| # | 路由 | 承担的任务 |
|---|---|---|
| 1 | `/` | 立场、范围、划界、导航 |
| 2 | `/sessions/` | **导航价值**:十二周按"问题"列表(不是按周次标题)、哪几周有 lecture、日期;Checklist v0 全文 |
| 3–14 | `/sessions/01…12-…/` | 12 个 studio:问题 / In the room(计时) / What you build / If you are joining late / **What this week cannot tell you** |
| 15 | `/lectures/` | **导航价值**:"This course has four lectures" 的理由,四场各自承担什么的对照表 |
| 16–19 | `/lectures/week-01,04,07,11/` | 概念;W1 挂 deck |
| 20 | `/assessments/` | 权重、日期 |
| 21–23 | `/assessments/…/` | A1 / A2 / A3 |
| 24 | `/people/` | 教学团队 |
| 25–26 | `/people/…/` | 2 人 |
| 27 | `/policies/` | 延期、诚信、**W11 同意与数据处理**、模拟器边界 |

另:`/decks/week-01/`、`/404`。

**studio 与 lecture 的分工已写成硬规则**(CLAUDE.md):studio 拥有练习,lecture 拥有概念。
lecture 页若开始讲怎么做练习,或 studio 页若从零讲概念,边界就塌了,两页之一变成冗余。

---

## 9. 决策记录(v1 §7 的三个取舍)

| | 决定 | 落地方式 |
|---|---|---|
| 一 | **4 场 lecture** | 概念任务与前后衔接逐场写明(§4);其余八周的框架讲解 + 阅读具名进 studio 页;核对过没有评分准则悬空 |
| 二 | **共用故意做坏的 `upload-ui`** | 阶段检查点 `stage-01…11`;统一措辞 "a floor, not an answer";每周 brief 不给目标答案 |
| 三 | **W11 课内三人互测 + 等量走查替代** | 评分只看结论与证据是否相称;3 项决定 / 最多 3 处改动 |

---

## 10. `spec/` 检查现状

| 文件 | 来源 | 内容 |
|---|---|---|
| `data-integrity.test.ts` | starter 自带 | 所有日期落在教学期内 |
| `assignment-2.test.ts` | 已有(官方 spec 转测试) | 保留 805、12 周有日期、deck ≥5 slide 并被 lecture 链接、权重合计 100 |
| **`course-shape.test.ts`** | **v2 新增** | **① 先教后考**(assessment 的每个 LO 都有更早日期的 studio 教过);② LO1–LO4 各自既被教也被考;③ 每周恰好一个 studio,slug 周数与 frontmatter 一致;④ **没有两周问同一个问题**;⑤ 每个 studio 渲染页含 "what this week cannot tell you";⑥ 每个 studio ≥2 条 `spec:` |

**①已做过反向验证:**把 A2 的可访问性 LO 挂到 A1 上,套件变红并输出
`progress-bar-autopsy is due 2027-03-12 and assesses LO3, first taught 2027-04-22`。
改回后 25/25 绿。一条不会失败的检查不是检查。

---

## 11. 下一批要做的事

1. **剩余 7 个 studio 页**(W3、W4、W5、W6、W8、W9、W12)目前 `draft: true`:
   frontmatter、日期、`outcomes`、`spec`、`related` 与衔接都是真的,正文是精简版。
   展开时要拆掉共用的模板句(见 §12 的重叠数据)。
2. **A1 / A2 正文**目前 `draft: true`(权重、日期、评分细则已定稿并上线)。
3. **两位教师**仍是 starter 的 Marisol Quaye / Idris Fenn,带 `STARTER_CONTENT` 标记。
4. **4 张 starter 图**未换 —— `check:evidence` 按 SHA-256 比对,必过不了。
   "刻意做成无图" 也是合法答案。
5. **`/policies/`** 仍是 starter 文案,需要写 W11 同意与数据处理。
6. `check:evidence` 目前必然失败(PROCESS.md 未写 + 图未换)——**PROCESS.md 由你自己写**。

## 12. 内容质量实测

- 7 词以上的句子跨页重复:**0 处**。
- studio 页两两 6-gram 重叠最高 **7.97%**(W6 vs W8),全部来自章节骨架与
  "No lecture this week; the studio opens with a 25-minute framing on…" 这句模板。
  这句在 7 个 draft 页里重复,展开正文时要逐页改写。
