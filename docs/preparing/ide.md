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
如果你不确定你应该用哪一个，可以按以下流程判断：

  1. 你之前学过编程吗？
    - 否：选 VSCode。
    - 是：继续往下读。
  2. 你之前学过 Java 吗？
    - 否：选 Eclipse。
    - 是：继续往下读。
  3. 你是 Java 开发者吗？
    - 是：用你现在在用的 IDE。
    - 我是 Android 开发者：选 IntelliJ IDEA。
    - 否：Eclipse 和 IntelliJ IDEA 二选一。

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