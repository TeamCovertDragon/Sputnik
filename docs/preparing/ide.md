# IDE

集成开发环境（Integrated Development Environment，IDE）是一种特殊的软件，它通常包含了你在开发程序时可能会用到的任何东西，比如：

  - 依赖管理
  - 代码高亮
  - 代码补全
  - 代码生成
  - 自动排版
  - 静态分析
  - 构建
  - 运行与调试
  - 对各种工具（Git、Gradle 等）的兼容
  - ……

简单来说就是一站式服务。

## 我选什么 IDE 好？

你可以使用 {{ide[0]}}、{{ide[1]}} 或 {{ide[2]}} 来开发模组。

::: warning
虽然 IDE 不是必须，但是我们建议你选择 IntelliJ IDEA 或者 Eclipse 作为你的IDE，它可以帮助你很多。
:::

<script>
export default {
  data() {
    return {
      ide: ["Eclipse","IntelliJ IDEA","VSCode"]
    }
  },
  mounted () {
    this.ide.sort(function() {
    return .5 - Math.random();
});
  }
}
</script>