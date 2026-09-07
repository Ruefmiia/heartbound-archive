# Heartbound档案文档说明

档案采用“月度主档案 + 分类派生档案”结构。

## 官方入口

- **剧集X官方账号：** [@HeartboundTH](https://x.com/HeartboundTH)

```text
archive/
├── monthly/                 # 月度综合文档：事实与来源的唯一主记录
│   ├── 2026-07.md
│   ├── 2026-08.md
│   └── 2026-09.md
├── categories/              # 从月度文档整理出的分类阅读视图
│   ├── production.md
│   ├── promotion.md
│   ├── materials.md
│   └── episodes.md
├── assets/                  # 无稳定公开链接的截图等必要存档
└── templates/
    ├── monthly-template.md
    └── category-template.md
```

## 维护原则

1. 月度综合文档是唯一事实源。事件结论、来源、截图说明和修订记录都先写入月度文档。
2. 分类文档只做索引和必要摘要，并链接回月度文档中的事件锚点；不要在分类文档里维护另一套来源材料。
3. 一个事件只分配一个稳定编号，例如 `010`。之后即使修改日期或标题，也不要更换编号。
4. 信息类型统一使用 `official`、`participant`、`unofficial`，分别代表官方、演员／工作人员、非官方消息。
5. 栏目统一使用 `production`、`promotion`、`materials`、`episodes`。同一事件可以属于多个栏目。
6. `href` 保存最主要的直接来源；其他来源写在正文的“来源记录”中。
7. `archiveUrl` 保存飞书或语雀的完整资料链接；没有时留空。

## 推荐工作流

```text
收集消息
  ↓
写入当月综合文档
  ↓
确认信息类型与所属栏目
  ↓
更新分类文档中的索引
  ↓
后续由程序读取月度文档并更新网站
```

模板中的尖括号内容需要替换，示例事件也应在正式使用时删除或改写。
