# SLOP2805 课程方案 v1（待你审阅）

Assignment 2 的课程规划。**本文件是规划稿,不是网站内容**;确认后再动 `src/`。

---

## 0. 我实际读了什么

| 来源 | 状态 |
|---|---|
| Assignment 2 brief + spec(官网) | 已读全文 |
| Assessment 通用要求(官网) | 已读全文:评分权重、band descriptors、字数、marking environment、截止规则 |
| 本仓库 `README.md` / `CLAUDE.md` / `PROCESS.md` / `spec/README.md` / `reflections/README.md` | 已读 |
| `src/course-config.ts` / `content.config.ts` / `site-config.ts` / 全部 placeholder 内容 / `spec/*.test.ts` | 已读 |
| Calling Bullshit 官方 syllabus 页 | 已读(本次抓取) |
| CMU Eberly "Articulate Your Learning Objectives" 页 | 已读(本次抓取) |
| MIT HTMAA `fab.cba.mit.edu/classes/863.25/` | **仅确认链接可达(HTTP 200),未读页面内容** |
| CS 007 `cs007.blog` | **仅确认链接可达,未读** |

下文对 HTMAA / CS007 的判断来自通识印象,不是本次阅读结论。**PROCESS.md 里若要引用,请你自己先看过再写**。

### 从官方页面抠出来的硬约束(已全部纳入下面的方案)

- 代码 `SLOP` + 级别位 + **保留 `805`**(本仓库分配)。
- **12 个有日期的教学周**,每周至少一个 dated session 或 lecture(`spec/assignment-2.test.ts` 已在查)。
- 至少一个 lecture 挂**真实 deck**,从该 lecture 页面链接,deck **≥5 张 slide**(已在查)。
- 考核**权重合计恰好 100**;每个 assessment 的 `marking.criteria` 权重**各自也要合计 100**(schema 强制)。
- 所有 dated 内容落在 `startDate`/`endDate` 之间。
- 13 处 `STARTER_CONTENT` 标记必须替换并删除;4 张 starter 图按 SHA-256 比对,不能原样留。
- `PROCESS.md` 400–600 字,引用可解析的 commit;`reflections/` 保持空(只留 README)。
- 部署 GitHub Pages,在 **1920×1080 和 390×844** 两个 viewport 下都算满分环境。
- 截止:**noon Mon 21 Sept 2026**(+15 分钟宽限)。无迟交,提前可申请延期。
- 评分:process 45% / artefact 20% / response 35%。

---

## 1. 课程身份

| 项 | 值 |
|---|---|
| `code` | **`SLOP2805`** |
| `level` | `2` |
| `title` | `Still Loading: The Design of Progress Bars` |
| 中文别名(仅用于我们沟通) | 卡在 99%:进度条的设计、时间与信任 |
| `session` | `Semester 1` |
| `year` | `2027` |
| `startDate` | `2027-02-22` |
| `endDate` | `2027-05-28` |
| `tags` | `["interface design", "waiting", "prototyping"]` |
| `sessionLabels` | singular `Studio` / plural `Studios` |

**为什么是 level 2:** 先修是一门入门 web 单元(HTML/CSS/基础 JS),不要求 HCI 或统计背景,也不做研究方法。level 2 正好;`805` 保留不动,只改首位。

**日历安排:** Studio 周二,Lecture 周四,第 6 周后休两周。
这不是随手排的 —— 周一在 2027 年 S1 连撞三个公众假日(Canberra Day 3/8、Easter Monday 3/29、ANZAC Day 顺延 4/26)。避开周一是个可以写进 PROCESS.md 的真实决策。

---

## 2. 课程简介(英文,带立场)

> **Every upload bar you have ever watched was lying to you, and most of them were lying for good reasons.**
>
> A progress bar is a promise made under uncertainty. The system does not know how long this will take, and it has to say something anyway. SLOP2805 spends a semester on that one sentence.
>
> This is not a course about UX. It is a course about the twelve inches of screen between a user pressing **Upload** and finding out whether it worked.
>
> The whole semester is one artefact. In week 1 you inherit a file-upload interface that sits at 99% for eleven seconds and then fails silently. By week 12 it tells the truth — including when the truth is *"I don't know."* Everything in between is you finding out what your interface actually has evidence for: bytes, stages, elapsed time, an estimate, or nothing at all.
>
> No server is involved. Every transfer, stall, timeout and dropped connection is simulated locally, which means you can reproduce any failure on demand. That is the thing you can never do with a real network, and it is the reason this subject can be taught at all.
>
> You will need HTML, CSS, and enough JavaScript to write a function that takes a callback. You will not need a background in psychology, and you are not permitted to cite one you do not have.

最后一句是全课的声音定调:**deadpan-sincere**。笑点在于"居然有人认真教这个",不在于段子。整站不许出现自嘲式玩笑。

### 课程写作声音规则(将写进 `CLAUDE.md`)

1. 全程正经。讽刺来自选题之窄,不来自语气。
2. 任何"用户会觉得 / 感觉更快"的句子,必须旁边挂一个可指认的观察来源,否则删掉。**课程自己的规则先用在课程自己的文案上。**
3. 每个 studio 页面必须回答四件事:本周核心问题 / 你要做出什么 / 怎么判断做成了 / **本周这套方法测不出什么**。第四条是反 AI 灌水的主锁。
4. 任何两周不得复用同一个核心问题或同一个动词(audit / build / compare / measure / defend 各有归属)。

---

## 3. 学习成果(CMU 句式:动作动词 + 对象 + 判准)

CMU 那页的要求是 "At the end of the course, students should be able to ___",动词要可观察,且复合技能要拆成分项。按这个改写了你的四条:

| ID | 表述 |
|---|---|
| **LO1** | **Trace** each claim a waiting interface makes — a percentage, a time, a word, a motion — **to the event in the underlying process that could support it**, and mark the ones that have no possible source. |
| **LO2** | **Implement** a file-upload waiting interface that behaves correctly under **known duration, unknown duration, stall, timeout, disconnection, cancellation and retry**, using a local simulator. |
| **LO3** | **Audit and repair** a waiting interface's keyboard path, status text and reduced-motion behaviour against a **stated checklist**, recording failures as failures. |
| **LO4** | **Justify** a design decision from your own recorded observation, and **state what your evidence cannot establish**. |

LO2 把"实现"拆成了七个具体状态 —— 这是 CMU 说的"把复合技能拆成分项技能",也让 A2/A3 的评分细则有东西可挂。

### 对齐矩阵(constructive alignment)

| | 教学周 | 主评 | 次评 |
|---|---|---|---|
| LO1 | 1, 2, 3, 5, 10 | A1 | A2, A3 |
| LO2 | 2, 4, 5, 8, 9 | A2 | A3 |
| LO3 | 2(checklist v0), 7, 8, 9 | A2 | A3 |
| LO4 | 5, 6, 10, 11 | A3 | A1 |

---

## 4. 十二周教学表

Studio = 周二 · Lecture = 周四。**本课只有 4 场 lecture**(见 §7 取舍一),其余时间在机器前。

| 周 | 日期 | 核心问题 | LO | 课内练习 | 当周产出 | 进入考核 |
|---|---|---|---|---|---|---|
| **1** | Studio 2/23<br>**Lecture 2/25** | "99%" 到底承诺了什么? | LO1 | **Autopsy clinic.** 两人一组,拿一段真实等待界面的录屏(课程提供 6 段),逐条写下它做出的每一个断言,旁边写"系统里什么事件能支撑它",最后圈出没有任何可能来源的那些。 | 一份 claim/evidence 表 + 本地跑起来的 `upload-ui` 起始仓库 | A1(这就是 A1 的方法预演) |
| **2** | Studio 3/2 | 什么算"做完了"? | LO1 LO2 | 枚举一次上传的全部状态(idle / selected / hashing / transferring / verifying / committed / failed / cancelled),找出你现在的 UI 把哪几个压成了一个。实现状态枚举 + 一个可见的 debug 状态栏。 | 状态图 + debug 面板;**同时发布 Waiting Interface Checklist v0**(焦点不被困住 / 每个状态都有文字 / 不许只用动效表示状态)—— 从本周起是常设要求 | A1, A2 |
| **3** | Studio 3/9 | 百分比的分母在哪? | LO1 | 同一段模拟上传,并排实现两条进度条:按字节 vs 按阶段。记录它们在什么时刻、差多少。 | 两条可跑的进度条 + 一段"哪条撒谎更少,以及在什么事上撒谎"的短文 | **A1 截止 周五 3/12 17:00** |
| **4** | Studio 3/16<br>**Lecture 3/18** | 不知道还要多久,该显示什么? | LO2 | 针对未知大小的上传做三种不确定态处理:活动指示器 / 已用时间计数 / 阶段数未知的清单。**硬规则:三种都不许暗示任何分数。** | 三个不确定态变体 + 一条"各自什么时候才允许用"的规则 | A2 |
| **5** | Studio 3/23 | 为什么剩余时间一直跳? | LO1 LO2 LO4 | 在同一条录制好的传输轨迹上实现三种估计器(朴素线性 / 滑动窗口速率 / 指数加权),记录估计值随时间的跳动幅度。**轨迹和绘图脚手架由课程提供,学生只写三个 `estimate()` 函数。** | 三个估计器 + 各自的不稳定度数值 + "上线哪个、取整到几秒、多久刷新一次"的决定 | A2, A3 |
| **6** | Studio 3/30<br>**Lecture 4/1** | 动得怎么样,会改变等了多久吗? | LO2 LO4 | 在**时长完全相同**的 20 秒模拟上传上做三种动效(匀速 / 减速 / 脉冲)。全班排序,不告诉任何人三者时长一样。记录结果,**同时记录它为什么是弱证据**(n≈20、顺序效应、非盲、被试全是知道考点的同学)。 | 三个动效变体 + 一份排序记录 + 一段写明本次比较局限的文字 | A3 |
| | | *—— 休两周 ——* | | | | |
| **7** | Studio 4/20<br>**Lecture 4/22** | 关掉动画、拔掉鼠标、看不见屏幕,它还成立吗? | LO3 | **课内审计工作坊,对着自己的原型做:**键盘从选文件到看结果的完整路径;`role="progressbar"` 与 `aria-valuenow`/`aria-valuetext` 语义;一个 polite live region,报状态变化但不报每一个百分点;`prefers-reduced-motion` 变体。然后**两人互审**。 | 两张填完的审计表(自己的 + 别人给你做的)+ 当场提交的修复 | **A2 截止 周五 4/23 17:00** |
| **8** | Studio 4/27 | 三十秒没动静,你说什么? | LO2 LO3 | 给模拟器加三个故障注入器:停滞、超时、断线。**每一个都先写文案再写 handler** —— 发生了什么、对用户的文件意味着什么、接下来会怎样。 | 三个可复现的异常状态,每个的文案都点明"你的文件现在怎么样了" | A3 |
| **9** | Studio 5/4 | 按下取消,到底承诺了什么? | LO2 LO3 | 实现 cancel 与 retry,**在每个 handler 上方先用一行注释写死保证**("cancel: 不保留任何字节";"retry: 从阶段 N 续传,不从零开始"),然后写测试去验证代码真的守住了这个保证。 | 守得住书面保证的 cancel/retry + 每条保证一个测试 | A3 |
| **10** | Studio 5/11 | 你屏幕上哪些数字没有来源? | LO1 LO4 | **第 1 周的反向操作,对象换成自己的原型。**屏幕上每一个数字、每一句文案、每一个动效,回溯到产生它的那个事件。回溯不到的:要么删掉,要么写下你明知没有来源却保留它的理由。 | 一份自己界面的 claims register,每行一个判定:sourced / removed / kept-with-reason | A3(这份 register 是 A3 的交付物之一) |
| **11** | Studio 5/18<br>**Lecture 5/20** | 五个人能告诉你什么,是你一个人想不出来的? | LO3 LO4 | 用课程提供的 15 分钟脚本(含知情同意语句)跑 **5 位被试**:上传一个文件,途中撞上停滞,请他们出声说自己以为发生了什么。**只记录他们做了什么、说了什么。**然后做**恰好三处**改动,每处都能指回某一条观察。 | 5 份记录 + 3 处改动 + 一段"五个人测不出什么"的说明 | A3 |
| **12** | **Showcase 5/25**<br>5/27 | 最后一个百分点,你守得住吗? | LO1–LO4 | 8 分钟展示:带着界面走一遍成功 / 停滞 / 失败,然后就某个你"明知没来源却保留"的决定,接受现场两轮质询。 | 完整 kit + 现场辩护 | **A3 截止 周五 5/28 17:00** |

### 四场 lecture

| Lecture | 周 | 题目 | 备注 |
|---|---|---|---|
| L1 | 1 | *What 99% Promises* | **挂真实 deck `/decks/week-01/`,≥5 张**(spec 硬要求) |
| L2 | 4 | *Saying Nothing, Precisely* | 不确定态的设计史与规则 |
| L3 | 7 | *Reading an Interface Without Looking at It* | ARIA / live region / reduced motion |
| L4 | 11 | *Five People Is Not a Study* | 小样本能说什么、不能说什么 |

---

## 5. 三项考核(完整设计 + 评分细则)

权重 **20 + 30 + 50 = 100** ✓。每项 `marking.criteria` 内部也各自合计 100 ✓。

### A1 — Progress Bar Autopsy · 20% · week 3 · due **Fri 12 Mar 2027, 17:00 AEDT**

**主评 LO1,次评 LO4。只考第 1–3 周教过的东西。**

**提交物** —— 仓库内一个页面 `/autopsy/`,800–1000 字 + 一张表:

1. 指名一个真实的等待界面,附 ≤30 秒录屏或逐帧序列作为证据。
2. **Claims table**:界面做出的每一个断言(数字 / 文字 / 动效)× 系统里可能支撑它的证据 × 判定(sourced / unsourceable / can't tell from outside)。
3. 你推断出的状态模型,以及该界面把哪些状态压成了一个。
4. 一段话:它要知道些什么,才配说出它说的话。
5. 一行 limits:站在系统外面,你判定不了什么。

**评分细则**

| 准则 | 权重 | 判准 |
|---|---|---|
| Evidence tracing | 40 | 每条断言都被追溯到一个可能来源,或被明确标为无来源;录屏里出现过的断言没有一条漏出表外 |
| State reading | 25 | 推断的状态模型能解释录屏里的行为,**包括它没展示出来的那些转移** |
| Honesty of limits | 20 | 说清黑盒观察建立不了什么,并且全文没有越过这条线去断言 |
| Clarity | 15 | 没见过该界面的读者能跟上论证;表格在 390px 宽下可读 |

**明确不给分的:**修复方案、重设计、任何心理学解释。

---

### A2 — Waiting Interface Prototype · 30% · week 7 · due **Fri 23 Apr 2027, 17:00 AEST**

**主评 LO2,次评 LO3、LO1。**

**提交物** —— 部署好的原型 + 仓库内 `/audit/` 页。

原型必须在**同一个界面里**处理以下四种情形,且把模拟器控件暴露出来,让评分人能逐个触发:

- **(a)** 已知大小的上传,确定态进度条,**分母在页面上写明**;
- **(b)** 剩余时间读数,**页面上写明用的是哪个估计器、取整到多少、多久刷新一次**;
- **(c)** 未知大小的上传,**任何地方都不出现分数** —— 包括标题栏和 favicon;
- **(d)** 一个写明了"完成判据"的完成态。

`/audit/` 页:第 2 周的 checklist v0 逐条填完,加第 7 周的审计表(键盘路径 / progressbar 语义 / live region 行为 / reduced-motion 变体),每行 pass / fail / n-a 并附证据。

**评分细则**

| 准则 | 权重 | 判准 |
|---|---|---|
| Behaviour across the four conditions | 35 | 评分人用暴露的控件,四种情形都能复现 |
| Evidence discipline | 25 | 屏幕上没有任何东西暗示了状态并不支持的精度;(c) 情形下全站无分数 |
| Accessibility audit | 25 | 审计表完整且诚实 —— **把 fail 记成 fail 有分,把 fail 记成 pass 不但没分还要扣**;记为 pass 的条目在部署版上可验证 |
| Both viewports | 15 | 1920×1080 与 390×844 下进度条、文案、控件全部可达可读 |

**明确不考:**估计器的准确度(第 5 周是练习不是考点)、动效偏好(第 6 周)、异常状态(第 8 周以后)。

---

### A3 — Honest Waiting Kit · 50% · week 12 · showcase **Tue 25 May** · due **Fri 28 May 2027, 17:00 AEST**

**LO1–LO4 全覆盖。**

**提交物 —— 四件 + 一场展示:**

1. **部署的原型** —— 成功 / 停滞 / 超时 / 断线 / 取消 / 重试,全部可从暴露的控件复现;reduced-motion 与键盘路径完好。
2. **State and message reference** `/states/` —— 一状态一行:它是什么意思、用户看到什么、**对用户的文件保证了什么**。
3. **Evaluation record** `/evaluation/` —— 5 份观察记录、3 处改动及其对应的观察、以及"五个人测不出什么"。
4. **Claims register** `/claims/` —— 屏幕上每一个数字、文案、动效,它的来源事件,判定 sourced / removed / kept-with-reason。
5. **8 分钟 showcase**(第 12 周 studio)。

**评分细则**

| 准则 | 权重 | 判准 |
|---|---|---|
| Behaviour under abnormal conditions | 30 | 每个列出的故障都能复现;界面从不宣称自己没在取得的进展;cancel/retry 守得住写下的保证 |
| Claims register | 25 | 与部署版屏幕逐项对得上;每条判定站得住;"kept with reason" 里写的是理由,不是借口 |
| Evaluation and revision | 20 | 三处改动都能指回具体观察记录;limits 是针对这次这五个人写的,不是通用套话 |
| Accessibility and both viewports | 15 | 键盘、状态文字、reduced-motion;两个 viewport |
| Defence | 10 | 现场能就一条"明知保留"的断言回答两轮质询,**且不退回到"这样感觉更好"** |

---

## 6. 网站页面结构

目标 ~24 页。注意一个结构性事实:**12 个 studio 页面 + 各 index + 首页 + people + policies + 三个 assessment = 23 页是地板**,所以"24 页"实际上等于"只排 1 场 lecture"。我的建议是落在 **26–28**,并在 §7 取舍一里把这个决定交给你。

### 基线(27 条路由,推荐)

| # | 路由 | 内容 |
|---|---|---|
| 1 | `/` | 首页:上面那段简介 + "你会做出什么" + "这门课不教什么" + 入口卡片 |
| 2 | `/sessions/` | Studios 索引:12 周一览表,每行是那周的**核心问题**(不是周次标题) |
| 3–14 | `/sessions/01-…` … `/sessions/12-…` | 12 个 studio 页,每页四段固定骨架:核心问题 / 你要做出什么 / 怎么判断做成了 / **本周测不出什么** |
| 15 | `/lectures/` | Lecture 索引,开头一句:*"This course has four lectures."* |
| 16 | `/lectures/week-01/` | L1 + **真实 deck** |
| 17 | `/lectures/week-04/` | L2 |
| 18 | `/lectures/week-07/` | L3 |
| 19 | `/lectures/week-11/` | L4 |
| 20 | `/assessments/` | 权重、日期、每项对应哪些 LO |
| 21 | `/assessments/progress-bar-autopsy/` | A1 |
| 22 | `/assessments/waiting-interface-prototype/` | A2 |
| 23 | `/assessments/honest-waiting-kit/` | A3 |
| 24 | `/people/` | 教学团队 |
| 25–26 | `/people/<convenor>/` `/people/<tutor>/` | 2 人 |
| 27 | `/policies/` | 延期、学术诚信、**第 11 周被试的同意与数据处理**、模拟器的使用边界 |

另有 `/decks/week-01/` 与 `/404`(不计入页数)。

### 可选加项:自建 collection `patterns`(+5 页 → 32)

README 明说允许自建 collection。对本课最自然的一个是 **waiting pattern 目录**:`/patterns/` + 4 个模式页(determinate bar / indeterminate indicator / staged checklist / optimistic completion),每页写"它承诺什么、它需要什么证据、它什么时候是在撒谎",由 studio 页面用 `related:` 指过去。

**好处:**真的在用平台的图能力(`related:` 双向渲染),而不是堆文案;12 个 studio 页面之间有了共享引用,一致性更容易守住。
**代价:**多 5 页要写,多 5 页可能出现灌水。

---

## 7. 需要你亲自决定的三个取舍

### 取舍一:lecture 排几场?

| 选项 | 页数 | 含义 |
|---|---|---|
| **A. 4 场(推荐)** | 27 | 首页敢写 "This course has four lectures. The rest of the semester happens at the machine." 这是一个**可被评为 response 的立场**,不是排课的结果 |
| B. 12 场(每周一场) | 35 | 看起来"完整",但 12 个 lecture 页 + 12 个 studio 页几乎必然互相复述 —— 这正是 brief 点名会扣分的 "twelve weeks that repeat one another" |
| C. 1 场 | 24 | 正好命中 24,姿态最狠,但可能被读成交付不足 |

**我的建议:A。** 理由:brief 说 markers 会"像准学生一样读十分钟,翻几个不相邻的周"。两套并行的周页面会让任意两页看起来像同一段话的两个版本,而 4 场 lecture 让每场都必须有独立理由存在。C 太冒险 —— 把一个"我想清楚了"的决定和一个"我没写完"的结果放在一起,评分人分不出来。

### 取舍二:全班改同一个上传界面,还是各建各的?

| 选项 | 含义 |
|---|---|
| **A. 课程发一个故意做坏的 `upload-ui` 起始件,全班在同一份上改(推荐)** | 每周的 brief 都能写得很具体("你现在的 UI 把 verifying 和 transferring 压成了一个状态 —— 找出来");互评、对照、评分都有共同基准;第 1 周第一节课就能开始分析而不是搭脚手架 |
| B. 各自从零建 | 主人翁感更强,但前三周会被 DOM 和文件 API 吃掉,而这门课的重点一行代码都还没碰到;而且 12 周的 studio brief 只能写得很泛 |

**我的建议:A。** 理由:这门课的稀缺资源是**注意力的窄度**,不是编码量。发起始件等于把"搭一个上传 UI"这件跟课程立场无关的事从学期里拿掉。而且它让第 1 周和第 10 周形成漂亮的对称 —— 第 1 周解剖别人的,第 10 周解剖自己手上这个同一血统的。**但这会波及每一页 studio 文案的写法**,所以必须现在定。

### 取舍三:第 11 周的评估,找真人还是结构化自评?

| 选项 | 含义 |
|---|---|
| **A. 5 位真实被试 + 提供脚本与同意语句(推荐)** | LO4 才有牙齿 —— "说明你的证据建立不了什么"只有在真有证据时才是一道题。代价:`/policies/` 必须写清同意、数据只留笔记不留录音、被试可随时退出 |
| B. 结构化自评 / heuristic walkthrough | 零伦理开销,可调度性强,但 LO4 退化成"想象一下局限性",而这恰恰是这门课最想反对的动作 |

**我的建议:A,但把规模钉死在 5 人、15 分钟、只记录行为与原话。**理由:整门课的论点是"没有观察就不许下断言";如果最后一次评估本身也是想出来的,课程就自我否定了。同时 5 人这个数字要在 L4 里被明确讲成"不够",这样 A3 的 limits 那一栏才不是套话。**如果选 B,LO4 的措辞、A3 的 "Evaluation and revision"(20 分)和 `/policies/` 都要重写。**

---

## 8. 自查:重复 / 跨度过大 / 先考后教

### 重复风险(逐对核过)

| 疑似重复 | 判定 | 区分点 |
|---|---|---|
| W1 解剖 vs W10 解剖 | **不重复,且是有意呼应** | W1 对**别人的**界面、从外部黑盒观察;W10 对**自己的**、能看到源事件,判定项从"can't tell"换成"kept-with-reason"。要在两页文案里互相点名 |
| W4 未知时长 vs W5 时间估计 | **不重复** | W4 的硬规则是**不许出现分数**;W5 的前提是**已经有分母**。一个是没有可说的,一个是有可说但不稳 |
| W6 动效 vs W7 可访问性 | **不重复,是前后手** | W6 造出三个动效变体,W7 把这三个变体拖去审计。W7 是 W6 产出的质检 |
| W8 异常状态 vs W9 取消重试 | **不重复** | W8 = 系统发起的状态,考"怎么解释";W9 = 用户发起的动作,考"承诺了什么并且守住" |
| W10 诚实审查 vs W11 证据改版 | **不重复** | W10 是逻辑追溯,一个人对着代码做;W11 是外部观察,对着人做 |

### 跨度过大的地方(3 处,都已配缓冲)

1. **W5 一节课三个估计器** —— 对 level 2 偏重。**已缓解:**轨迹数据和绘图脚手架由课程提供,学生只写三个 `estimate()` 函数体。
2. **W6 "做一次比较研究"** —— 有滑向 HCI 研究方法课的风险。**已缓解:**明确写成班内排序,且**本次练习的考点就是搞懂它为什么是弱证据**,不是得出结论。
3. **W11 五人研究** —— 招募 + 伦理 + 分析,一周吃不下。**已缓解:**脚本、同意语句、记录表全部课程提供;改动数量钉死为 3;不做任何统计。

### 先教后考(这是我最担心的一项,逐项核过)

| 考核 | 依赖内容 | 最晚教学时点 | 截止 | 判定 |
|---|---|---|---|---|
| A1 | W1 断言/证据、W2 状态、W3 分母 | Studio 3/9(周三) | 3/12 17:00 | ✓ 留 3 天 |
| A2 | W2–W6 + W7 审计 | **Lecture 4/22(周四)** | **4/23 17:00** | ⚠ **只剩 1 天** |
| A3 | 全部,最晚 W11 | 5/20 | 5/28 17:00 | ✓ 留 8 天 |

**A2 是唯一一处紧到需要设计手段去化解的地方。三道保险:**

1. **Checklist v0 在第 2 周就发。** A2 里可访问性的大部分内容(焦点、每个状态都有文字、不靠动效)是从第 2 周就在跑的常设要求,不是第 7 周的新东西。
2. **第 7 周的审计工作坊放在周二 studio(4/20),不是周四。** 学生在课堂里、有助教在场的情况下把审计做完,提交日只是交已经做完的东西。
3. **第 7 周的 Lecture(周四)不引入 A2 需要的新要求。** 它讲的是原理背景,A2 的评分点在周二那张表上已经全部出现过。

**如果你不接受这个紧度**,唯一干净的替代是把 A2 挪到第 8 周周二(4/27)截止 —— 但那会占掉第 8 周的 studio 时间,而第 8 周是异常状态,是 A3 的地基。**我建议保持 week 7,靠上面三道保险。**

---

## 9. 参考课程:哪些原则适合,哪些不适合

> 下列判断:Calling Bullshit 与 CMU 基于本次抓取的页面;HTMAA 与 CS007 **仅确认链接可达,未读内容**,判断来自通识印象。写进 PROCESS.md 前请你自己看过。

### CMU Eberly — *Articulate Your Learning Objectives*
<https://www.cmu.edu/teaching/designteach/design/learningobjectives.html>

**适合:**
- objectives / assessments / instructional strategies 三者对齐,改一个就要回头改另外两个。§3 的对齐矩阵和 §8 的先教后考核查,就是把这条做成了可检查的东西。
- "把复合技能拆成分项技能"。原来的 LO2 只说"实现能处理未知时长、停滞和失败的进度界面";拆成七个具名状态后,A2/A3 的评分细则才挂得上具体判准。
- 动作动词。已把 "辨别 / 检查" 换成 trace / audit and repair / justify。

**不适合:**
- CMU 的模板隐含**覆盖面**导向(Bloom 各层级铺一遍)。这门课的整个卖点是窄。硬凑一个 "create" 层级的成果只会把范围撑破。
- 它假设有一份独立于教学的课程内容清单。这里是**同一个人工制品驱动十二周**,顺序由制品的失效方式决定,不由知识点分类决定。

### Calling Bullshit(UW INFO 270 / BIOL 270)
<https://www.callingbullshit.org/> · syllabus: <https://www.callingbullshit.org/syllabus.html>

**适合:**
- 立场写在标题里,并且撑满一学期。"Still Loading" 与 "卡在 99%" 是同一个做法。
- 一个分析动作,每周换一批材料反复使用。它的动作是"这个claim的证据是什么";本课是"这个数字的来源事件是什么"。**A1 Progress Bar Autopsy 直接是这个传统。**
- 它的 learning objectives 写得非常口语("Provide your crystals-and-homeopathy aunt with an accessible explanation")—— 用受众来定义能力,而不是用动词表。第 12 周的现场质询就是这个思路的落地。

**不适合:**
- 它主要是**读与批判**,学生基本不做东西。本课有一半是实现,所以每一次批判都必须回流到 build,否则课程会退化成博客。W1→A1 是批判,但 W2 起每周都有可运行产出,就是为了防这个。
- 它的对抗式语域("bullshit")容易滑成犬儒。本课第 10 周必须配一个建设性对句 —— **"要让这个数字诚实,它得知道什么?"** —— 否则学生只学会了嘲讽。这也是我把 W10 的判定项设成三选一(含 "kept-with-reason")而不是二元真假的原因。

### MIT — How To Make (Almost) Anything
<https://fab.cba.mit.edu/classes/863.25/>

**适合(凭通识印象,未读):**
- 每周一个公开的产出,节奏本身就是课程结构。§4 的"当周产出"列是同一个做法。
- **文档即作业** —— 学生的站点就是提交物。本课的 `/claims/`、`/states/`、`/evaluation/` 三页是提交物而不是附录,同一个逻辑。
- 期末项目是前面各周技能的总和。A3 正是把 W2 的状态、W5 的估计器、W8 的故障、W10 的 register 合到一起。

**不适合:**
- HTMAA 的**广度**(每周换一台机器)跟这门课的窄度完全相反。照搬会把十二周变成十二个不相关的主题 —— 而 brief 明说这是会被扣分的。本课的"每周一个新东西"换成了**每周对同一个制品的一次新审问**。
- 它的强度和 fab lab 门槛是研究生级的。本课是 level 2 + 只要求基础 JS,所以每周的新增编码量必须压到"三个函数体"这种量级,靠课程发脚手架来兜。

### CS 007: Personal Finance for Engineers
<https://cs007.blog/>

**适合(未读,凭印象):**受众窄、语域平实、不塞填充内容 —— 正是首页那段简介想要的调子。
**不适合:**它是讲座式课程,本课是 studio。

---

## 10. `spec/` 检查(这是 45% process 分的主战场)

现有的 `spec/assignment-2.test.ts` 已经覆盖了官方 spec 的机械可查部分。**下面这些是"我决定我这门课必须为真的事",是评分人拿来读你课程设计判断的东西。**

| 文件 | 检查 |
|---|---|
| `spec/course-shape.test.ts` | 1–12 周**各有且仅有一个** studio;slug 前缀的周数与 frontmatter `week` 一致;**任意两个 studio 的 `question:` 不得重复**(直接对着 brief 点名的 "twelve weeks that repeat one another" 设防) |
| `spec/alignment.test.ts` | 每个 assessment 声明 `outcomes: [LO1…]`;LO1–LO4 每一条都至少被一个 studio 教过、被一个 assessment 考过;**且 assessment 声明的每个 LO,都有一个日期早于该 assessment `due` 的 studio 教过它** —— 把 §8 的"先教后考"变成一条 CI 会红的机器检查 |
| `spec/honest-pages.test.ts` | 每个 studio 页面的正文含 "What this week cannot tell you" 小节;每个 studio 至少声明 2 条 `spec:` |
| `spec/marking.test.ts` | 每个 assessment 的 `marking.criteria` 权重合计 100(schema 已管),**且每条准则都写了判准文字而非只有名字** |

`spec/alignment.test.ts` 那条是三项里最值钱的:它把一个**课程设计决定**(不考没教过的东西)变成了代码里的约束。这正是 brief 说的 "your spec/ checks are read as the record of what you decided had to stay true about your course"。

---

## 11. 待你确认后才动手的事

1. §7 三个取舍的决定。
2. 两位教师的名字、角色、简介方向(starter 里的 Marisol Quaye / Idris Fenn 要不要留名字)。
3. 4 张 starter 图的替换方案(`hero-home.avif`、`card.png`、两张人像)—— `check:evidence` 按 SHA-256 比对,不能原样留;"刻意做成无图" 也是合法答案。
4. `sessionLabels` 用 `Studio` 还是别的。

**确认前我不动 `src/`。**
