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
如果你不确定你应该用哪一个，只需要回答一个问题即可：「你对 Java 的了解多少？」

  - 我就是 Java 开发者：用你现在在用的 IDE。熟悉的当然是最好的。
  - 我用 Android Studio 开发 Android App：用 IntelliJ IDEA。
  - 我系统学过 Java：用你最了解的 IDE。
  - 我没有系统学过 Java：我们建议你系统学过 Java 后再来。

::: warning
虽然 IDE 不是必须，但是我们强烈建议你使用 IDE，在以后的开发过程中会派上用场的。
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