module.exports = {
  title: 'Sputnik - Next Gen. of Forge Tutor',
  description: "Spark in the darkness",
  base: '/',
  dest: 'preview',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    sidebar: [
      {
        title: '序',
        path:"/00/",
        collapsable: true,
        children: [
          '/00/preface-0',
          '/00/preface-1'
        ]
      },
      {
        title: '预备知识',
        path:"/01/",
        collapsable: true,
        children: [
          '/01/java',
          '/01/mdk',
          '/01/gradle-ide',
          '/01/mcp',
          '/01/forge',
          '/01/fg',
        ]
      },
      {
        title: '入口',
        path:"/02/",
        collapsable: true,
        children: [
        ]
      },
      {
        title: '事件',
        path:"/03/",
        collapsable: true,
        children: [
        ]
      },
      {
        title: '注册物',
        path:"/04/",
        collapsable: true,
        children: [
          '/04/GameObject',
          '/04/ForgeRegistryEntry',

        ]
      },
      {
        title: '简单模组',
        path:"/05/",
        collapsable: true,
        children: [
          '/05/item',
          '/05/block',
        ]
      },
      {
        title: '物品进阶',
        path:"/06/",
        collapsable: true,
        children: [
        ]
      },
      {
        title: '方块进阶',
        path:"/07/",
        collapsable: true,
        children: [
        ]
      },
      {
        title: '方块实体',
        path:"/08/",
        collapsable: true,
        children: [
        ]
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
