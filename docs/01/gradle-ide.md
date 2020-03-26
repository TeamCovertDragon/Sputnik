# Gradle & IDE

> Gradle 是一个构建工具。它可以帮你搞定构建 Java 项目中遇到的各种问题。  
> 当然，你也可以再来一个 IDE。

## Gradle

你不需要知道 Gradle 是啥，你只需要知道你需要用到它就行了。

## IDE

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
