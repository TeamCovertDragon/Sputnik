# MCP

MCP 是最初由 [Searge][ref-searge] 等人发起，目前由 bspkr 和 Lex 等社区成员维护的一个项目，目标是提供一套Minecraft 的“反混淆映射表”。

~~题外话，没错，Searge 现在是 Mojang 员工，负责 Java 版 Minecraft 的开发。~~

## 混淆？

为 Minecraft 写 Mod 的第一步首先是要逆向工程 Minecraft。
Minecraft 是运行在 JVM 上的，所以问题不大。但是，直接对 Minecraft 的 jar 进行反编译，你只能得到长这样的反编译结果：

```java
// 并非 Minecraft 本体反编译结果，仅供说明使用
public class a extends b {
    private c c1;
    private final d d1;
    public a(e par1, f par2) {
        this.d1 = g(par1);
        this.c1 = h(par2)
    }

    private d g(e par1) {
        return ...;
    }

    public c h(f par1) {
        return ...;
    }
}
```

这些名字是 abcdefg 的函数和字段肯定不是人写出来的。它们是机器处理的结果。这个过程叫“混淆”（Obfuscation）。混淆的用途有这么几个：

  - 专门拖延别有用心的人的时间。
  - 一定程度上压缩文件体积（类、方法、字段名变短了）。

有鉴于 Java 编译器的工作方式，我们当然可以直接对着这个写 Mod，但你绝对不想这么做的。

## 人力反混淆

天无绝人之路。有那么一些眼尖的人忽然注意到，我们还是有办法猜出来这些类、字段、方法原本都叫什么的。
具体来说，我们先从这些地方开始：

  - `toString` 的实现
  - `Exception` 的构造器里传入的异常信息
  - 方块、物品等的内部名称（注册名）

我们可以先根据这些线索来确定一部分类的名称。然后，对于那些没有明显提示的混淆名，我们可以想象我们是 Mojang 员工，正在写 Minecraft，换做是我们又会怎么给这个类/字段/方法/方法参数命名。毕竟，虽然名字混淆了，但逻辑还在那里。如果我们就这样顺藤摸瓜逐个人力翻译下去会发生什么？

MCP（Mod Coder Pack）就是这样诞生的——很久<!-- TODO 多久？ -->之前，有一帮先驱者们率先开始了对 Minecraft 这个商业软件的人力反混淆工程。最终的成果便是一套完整的反混淆映射表（“mapping”），通称 MCP Mapping。它代表了一票社区贡献者站在局外人的视角上对 Minecraft 底层代码的理解<black>虽然参与人力反混淆的人并不多</black>。说得夸张一点，我们甚至可以认为映射表是猜出来的（当然，事实上是基于现有线索推理出来的）。  

显然，MCP 给出的也只是一套“参考解读”。MCP 反映的是社区成员对 Minecraft 当前底层的解读，不代表真实情况，更不代表未来的变化。正因为此，MCP 的理解有可能与 Mojang 员工实际想表达的意思有偏差，换言之 Mojang 员工们实际使用的名称可能和 MCP 大相径庭。与此同时，这也意味着 MCP 给出的名称是有可能比 Mojang 员工使用的名称更准确的。

## MCP 的频道与版本号

本指南使用的是 `snapshot` 频道上的 `20200225-1.15.1` MCP Mapping。

MCP 分两个更新“频道”，不同频道有不一样的版本号：

  - 稳定频道（`stable`）。稳定版通常对于一个特定版本的 Minecraft 只有一个，所以它“稳定”。
    - 稳定频道的 MCP 版本号是数字。比如 `stable_60`。
    - 稳定频道不定期发布新的稳定版映射表。
    - 使用稳定频道，你就不用头疼更新映射表后你的代码一堆编译错误的问题。
  - 快照频道（`snapshot`）。快照版囊括当前 MCP 所有最新的变化~~，对于 Modder 来说就是每天 breaking change~~。
    - 快照频道的 MCP 版本号都是日期，比如本教程使用的 `20200225-1.15.1`。
    - 快照频道会在美国东海岸时间每天凌晨三点（北京时间当日下午三点，有夏令时则是当日下午四点）准时更新一次。
    - 使用快照频道，你可以跟上更新、更准确的对 Minecraft 底层的解读。

## 不可避免的二进制不兼容更新与 Searge 名

前文说到 MCP 有版本号。为什么会有一个版本号？很明显，因为是社区成员对 Minecraft 底层的理解，说不定哪里就有错误，因此映射表不可避免地需要更新，以更好地反映 Minecraft 的底层逻辑。  
但这样一来马上就会出现新的问题：

> 方法、字段名字都可以随便变来变去，那我更新一下 MCP，我的代码就得再改一次？  

虽然没有直接证据，但 Mod 开发者们普遍认为这正是我们有三种不同名字的原因：

  - 大部分 Mod 开发者会把某个 Searge 名或 MCP 名对应的混淆名作“Notch 名”，以纪念 Minecraft 的创始人 Notch。
  - 形如 `func_12345_a`、`field_67890_b` 的“Searge 名”，以纪念当年 MCP 的发起人 Searge。它的特点是：
    - MCP 保证不论 MCP 名怎么改来改去，Searge 名都不会有变动，哪怕这个字段或方法最终因为 Minecraft 版本更新消失了都不会重新回收利用。
    - MCP 尽力将不同版本中确定是相同方法的不同 Notch 名映射到同一个 Searge 名上去。
    - 类名没有 Searge 名。
  - 代表了社区解读的“MCP 名”。

因此 Searge 名是一个稳定的“中间体”。这甚至意味着我们可以用在 1.15 上使用适用于 1.14 的 MCP——虽然你这样做只能在开发环境里看到一堆 Searge 名。

## 重混淆（Re-obfuscation，reobf）

这样一来，只需要 Mod 在最终编译时重新“混淆”回 Searge 名，就可以在一定程度上抵抗 MCP 更新引发的二进制不兼容问题，因为使用不会变化的 Searge 名保证了二进制兼容。这个过程通称“重混淆”（re-obfuscation，缩写 reobf）。  

于是我们可以继续在开发环境里使用 MCP 名了。

## 但这还是逆向工程啊！

是的，这是逆向工程，所以 MCP 这样的工程仍然落在一个灰色偏黑的地带中。之所以 MCP 这样的工程能活到现在，还是要拜 Mojang 的态度所赐。毕竟 Mojang 也清楚 User-Generated Content（UGC）是 Minecraft 成功的关键一环。

### 关于官方映射表的一两句话

Mojang 甚至决定在 19w36a 发布时宣布[放出含有原始类名、方法名和字段名的 ProGuard 的混淆记录][ref-19w36a]。它本质上是“官方映射表”——代表了 Mojang 员工对 Minecraft 底层的类、字段和方法的命名。没有方法参数、没有注释、没有局部变量名。所以它仍然不是源码。

而且它的使用许可非常模糊：

> © 2019 Microsoft Corporation. All rights reserved. This information is provided “as-is” and you bear the risk of using it. This information does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this information for your internal, reference purposes. Microsoft makes no warranties, express or implied, with respect to the information provided here.

注意 `You may copy and use this information for your internal, reference purposes.` 这句话。在官方没有解释这句话的含义的前提下，这等于我们不能在任何公开的地方使用这套映射表的任何东西。

[ref-19w36a]: https://www.minecraft.net/en-us/article/minecraft-snapshot-19w36a

[ref-searge]: https://minecraft.gamepedia.com/Searge
