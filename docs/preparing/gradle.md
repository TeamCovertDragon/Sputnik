# Gradle

> Gradle helps teams build, automate and deliver better software, faster.
> （Gradle 帮助开发团队更快地构建、自动化并发布更好的软件。）
> \- https://gradle.org

Gradle 是一个构建工具（Build Tool）。它可以帮你搞定构建 Java 项目中遇到的各种问题。  

## 我为什么需要 Gradle？

开发一个 Mod 需要做的事情并不只是编译 Java 源码那么简单。你前前后后需要做的事情大概有：

  - 下载所有的依赖项
  - 编译然后打包，中间需要[重混淆](mcp.md)
  - 启动游戏进行调试
  - 签名
  - 自动上传发布
  - ……

Gradle 的用途就是让这些工作可以一行命令就能完成，你就不用再手动操作了。

## 从哪下载 Gradle？

Forge 的 [MDK](mdk.md) 中自带了 Gradle Wrapper，它可以自动在第一次运行时下载 Gradle。

