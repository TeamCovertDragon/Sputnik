module.exports = {
  title: 'Sputnik - Next Gen. of Forge Tutor',
  description: "Spark in the darkness",
  base: process.env.BASE_URL ? process.env.BASE_URL : "/",
  dest: 'preview',
  head: [
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">'
  ],
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require("markdown-it-katex"));
    }
  },
  themeConfig: {
    sidebar: [
      {
        title: '序',
        path:"/preface/",
        collapsable: true,
        children: [
          '/preface/preface-0',
          '/preface/preface-1'
        ]
      },
      {
        title: '预备知识',
        path:"/preparing/",
        collapsable: true,
        children: [
          '/preparing/java',
          '/preparing/mdk',
          '/preparing/ide',
          '/preparing/gradle',
          '/preparing/mcp',
          '/preparing/forge',
          '/preparing/fg',
        ]
      },
      {
        title: 'Mod 元数据',
        path: "/metadata/"
      },
      {
        title: '入口',
        path:"/entry/",
        collapsable: true,
        children: [
        ]
      },
      {
        title: '事件',
        path:"/event/",
        collapsable: true,
        children: [
          '/event/why-my-events-do-not-work'
        ]
      },
      {
        title: '预制物',
        path:"/registries/",
        collapsable: true,
        children: [
          '/registries/GameObjectRegister',
          '/registries/ForgeRegistryEntry',

        ]
      },
      {
        title: '物品与方块概论',
        path:"/first-step/",
        collapsable: true,
        children: [
          '/first-step/item',
          '/first-step/block',
        ]
      },
      {
        title: '物品进阶',
        path:"/advanced-item/",
        collapsable: true,
        children: [
        ]
      },
      {
        title: '方块进阶',
        path:"/advanced-block/",
        collapsable: true,
        children: [
        ]
      },
      {
        title: '服务端与客户端',
        path: "/sides/"
      },
      {
        title: '网络 I/O',
        path: "/network-io/"
      },
      {
        title: '附录',
        path:"/ex/",
        collapsable: true,
        children: [
          '/ex/style',
          '/ex/template',
        ]
      },
    ]
  }
}
