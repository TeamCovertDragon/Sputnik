# ForgeGradle

ForgeGradle 是 Forge 开发团队推出的 [Gradle](gradle.md) 插件，主要用途就是简化基于 MCP 和 Forge 的 Minecraft Mod 开发的流程。

## 为什么？

思考一下 Mod 开发和发布的流程：

  - 首先我们要下载 Minecraft 本体。
  - 然后我们要下载 Minecraft 的所有依赖项。
  - 接着我们要反编译并[反混淆](mcp.md#人力反混淆)，这样我们才能读懂 Minecraft 底层。
  - 这个时候我们才能开始写代码。
  - 到了发布 Mod 的时候，在编译好 Mod 的基础上我们还要[重混淆](mcp.md#重混淆（Re-obfuscation，reobf）)。

显然，我们可以并且应该让 Gradle 帮我们搞定这些。ForgeGradle 应运而生。

## ForgeGradle 能干什么？

  - 部署开发环境
    - 下载、反编译及反混淆 Minecraft
    - 下载 assets（音效和语言文件等）
  - 反混淆和重混淆
    - Mod 构建时会自动过一遍重混淆
    - 对于依赖项目，可用 `fg.deobf`
  - IDE 相关
    - 自动生成 Run/Debug Configuration，目前支持 Eclipse、IntelliJ IDEA 和 VSCode。
  - 连带当前项目一起运行 Minecraft：
    - 运行服务器（`runServer` task）
    - 运行客户端（`runClient` task）
    - 运行数据生成器（`runData` task）

## 面向用户的配置

ForgeGradle 最常用的选项都可以在 `build.gradle` 的 `minecraft` block 中找到：

```groovy
minecraft {
    // 在这里指定映射表版本。
    // 关于 MCP 版本号的说明可在 MCP 一节中找到。
    mappings channel: 'snapshot', version: '20200225-1.15.1'

    // 在这里可以修改运行 Minecraft 时的配置。
    runs {
        // 客户端配置
        client {
            // 指定 Minecraft 根目录（即俗称 .minecraft 的那个目录）的位置
            workingDirectory project.file('run')

            // 调试日志相关，下同。
            property 'forge.logging.markers', 'SCAN,REGISTRIES,REGISTRYDUMP'
            property 'forge.logging.console.level', 'info'

            // 指定 Minecraft 的启动参数。下面这个参数可以用来修改玩家名称
            args '--username=Foo'

            // 这一串是让游戏识别到你写的代码的，不用管它。下同。
            mods {
                examplemod {
                    source sourceSets.main
                }
            }
        }

        // 服务器配置
        server {
            // 指定服务器根目录的位置
            workingDirectory project.file('run')

            property 'forge.logging.markers', 'SCAN,REGISTRIES,REGISTRYDUMP'
            property 'forge.logging.console.level', 'info'

            mods {
                examplemod {
                    source sourceSets.main
                }
            }
        }

        // 数据生成器配置
        data {
            workingDirectory project.file('run')
            property 'forge.logging.markers', 'SCAN,REGISTRIES,REGISTRYDUMP'
            property 'forge.logging.console.level', 'info'

            // 记得把 your_mod_id 换成你的 Mod id。
            args '--mod', 'your_mod_id', '--all', '--output', file('src/generated/resources/')

            mods {
                examplemod {
                    source sourceSets.main
                }
            }
        }
    }
}
```
