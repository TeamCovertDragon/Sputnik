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
      '/',
      {
        title: '序',
        path:"/00-preface/",
        collapsable: true,
        children: [
          '/00-preface/preface-0',
          '/00-preface/preface-1'
        ]
      },
      {
        title: '预备知识',
        path:"/01-preparing/",
        collapsable: true,
        children: [
          '/01-preparing/java',
          '/01-preparing/mdk',
          '/01-preparing/gradle-ide',
          '/01-preparing/forge',
          '/01-preparing/mcp',
          '/01-preparing/fg',
        ]
      },
    ]
  }
}
