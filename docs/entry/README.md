# 入口

> **前置知识**
> - [预备知识](../preparing/README.md)
> - [事件](../event/README.md)

## 概述

正如可执行程序需要一个入口，让系统知道从何开始调用你的程序， Forge Mod 也需要一个入口，来让 FML 知道从哪里获取你的 Mod 实例，同时让你在 FML 初始化你的 Mod 时执行一些任务，我们通常称这个入口类为**主类**。

::: tip
`net.minecraftforge.fml.ModLoader` 类中有 FML 加载 Mod 的流程和发布事件时机的总览，推荐读者前去阅读。同时需要注意的是，Forge 的源代码中有大量的注释，或说明 Forge 期望你用什么类干什么，或说明某些注解和事件的功能。阅读注释对理解 Forge 的设计和快速熟悉使用 Forge 是意义重大的，同时也是一名合格 Modder 的基本素养之一。<heimu>什么，你问那还要这个教程干什么？</heimu>
:::

### @Mod 注解

如上文所述，FML 需要有一种方法找到你的 Mod 主类，而 FML 选择了注解以完成这个任务。我们会给主类打上 `@Mod` 注解（即相当于给主类打上了一个标记），`@Mod` 的唯一一个参数为被注解的 Mod 主类对应的 Mod 的 modid，即用于区分各个 mod 的一个英文字符串 id，其各类用途会在其他章节中提及。值得注意的是，此参数中的 modid **必须**对应 mods.toml 中填写的 modid。

### FML 生命周期事件

FML 把 Mod 加载分成了若干个阶段，这些阶段共同组成了 Mod 加载的生命周期。每一个阶段由一个事件代表。你需要订阅合适的事件来完成你的 Mod 的加载。比如，和渲染有关的内容应在 `FMLClientSetupEvent` 发布时完成。这些事件在 MOD 事件总线上发布，可通过 `FMLJavaModLoadingContext.get().getModEventBus()` 获取。FML 以此让我们得以在正确的时机，在正确的逻辑端进行正确的行为。

::: tip
这里我们提到的逻辑端之类的概念，将会在[之后的章节](../sides/README.md)详细介绍。  简而言之，不论是单机游玩还是联机游玩，游戏中需要执行的各种任务都是按照职能被划分到客户端执行和服务端执行两个类别中的。分清什么任务应当在哪一端执行至关重要，也应该是一名合格的 Modder 的基本素养之一。值得注意的是，大部分在服务端进行的注册任务在客户端同样需要进行。
:::

FML 生命周期事件存在于 `net.minecraftforge.fml.event.lifecycle` 包中。除此之外，还有数个特殊的事件: 
- `net.minecraftforge.event.RegistryEvent` 中的子类
- `net.minecraftforge.client.event.ModelBakeEvent` 中的子类
- `net.minecraftforge.client.event.ModelRegistryEvent`
- `net.minecraftforge.client.event.ColorHandlerEvent` 中的子类
- `net.minecraftforge.client.event.ParticleFactoryRegisterEvent`
- `net.minecraftforge.client.event.TextureStitchEvent` 中的子类

也是在 MOD 总线中发布的。这些主要是为了方便 Modder 在适当的时机和端注册东西。这些事件被发布的时机和事件被预期的的用途大部分都相当详尽地写在了类中的注释里，或者是本身的名称就足够直观。
**我们希望读者可以自行翻阅代码，阅读注释，以培养自己解决问题的能力**，同时对这些事件存在的意义有自己的，更深的理解，故不在这里做赘述了。

## 实现

接下来，我们将展示一个简单的 Mod 主类。

```java
package com.example.example_mod;

import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;

@Mod("example")
public class ExampleMod {
    //FML 通过 Class::newInstance 构造主类的实例，因此我们需要一个零参构造器
    public ExampleMod() {
        //通过方法引用注册监听器
        FMLJavaModLoadingContext.get().getModEventBus().addListener(this::commonSetup);
        FMLJavaModLoadingContext.get().getModEventBus().addListener(this::clientSetup);   
    }

    private void commonSetup(final FMLCommonSetupEvent event) {
        //TODO: 一些需要同时在逻辑服务端和逻辑客户端完成的任务.
    }

    private void clientSetup(final FMLClientSetupEvent event) {
        //TODO: 一些只需要在逻辑客户端完成的任务.(例如：用 RenderingRegistry::registerEntityRenderingHandler 给实体注册渲染器，等)
    }
}
```

以上代码中，我们在构造器内给总线注册了两个监听器以订阅事件。其中 `commonSetup` 会同时在逻辑服务端和逻辑客户端中被发布，而 `clientSetup` 只会在逻辑客户端被发布。对生命周期事件发布流程的详情请参见 `net.minecraftforge.fml.ModLoader`。
