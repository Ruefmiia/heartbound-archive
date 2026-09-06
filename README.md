# Heartbound档案库

PerthSanta主役剧集《Heartbound》的制作、宣传、物料与播出档案索引。

网站使用 Astro 构建，详细图文资料保存在飞书或语雀，网站负责时间线、分类索引和来源跳转。

## 本地开发

```sh
npm install
npm run dev -- --background
```

打开 `http://localhost:4321/`。开发环境右下角的“快速录入”按钮可以新增或编辑档案，数据会保存至 `src/data/events.json`。

## 常用命令

```sh
npm run build
npm run preview
npm run astro -- dev status
npm run astro -- dev stop
```

## 内容结构

- `src/data/events.json`：时间线与栏目索引数据
- `src/pages/`：首页、时间线及各档案栏目
- `src/components/`：公共界面组件
- `src/styles/global.css`：全站基础样式
- `integrations/local-events-editor.mjs`：仅在本地开发服务器中启用的录入接口

## 发布

`main` 分支是网站唯一源码。GitHub Pages 和 Tencent EdgeOne Pages 均从该分支构建，生产输出目录为 `dist`。

本地快速录入不会直接修改线上网站。完成录入并检查后，需要提交并推送代码，两个站点才会自动更新。
