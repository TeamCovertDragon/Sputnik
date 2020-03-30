# 入口

> <strong>前置知识</strong>
> - [预备知识](../preparing/README.md)
> - [事件](../event/README.md)

## 上章

正如可执行程序需要一个入口，让系统知道从何开始调用你的程序， Forge Mod 也需要一个入口，来让 FML 知道从哪里获取你的 Mod 实例，同时让你在 FML 初始化你的 Mod 时执行一些任务。

在 FML 加载一个 Mod 的工作流程中(只考虑对代码的加载流程)，它会首先找到你 Mod 中一个特殊的类，我们称之为主类。随后 FML 会自动构造 Mod 主类的一个实例，在之后的所有过程中，包括对其他被加载的 Mod 而言，这个实例会作为代表你 Mod 的存在。

> ```net.minecraftforge.fml.ModLoader``` 类中有 FML 加载 Mod 的流程和触发事件时机的总览，推荐读者前去阅读。同时需要注意的是，Forge 的源代码中有大量的注释，或说明 Forge 期望你用什么类干什么，或说明某些注解和事件的功能。阅读注释对理解 Forge 的设计和快速熟悉使用 Forge 是意义重大的，同时也是一名合格 Modder 的基本素养之一。<heimu>什么，你问那还要这个教程干什么？</heimu>

### @Mod 注解

如上文所述，FML 需要有一种方法找到你的 Mod 主类，而 FML 选择了注解以完成这个任务。我们会给主类打上 ```@Mod``` 注解（即相当于给主类打上了一个标记），```@Mod``` 的唯一一个参数为被注解的 Mod 主类对应的 Mod 的 modid，即用于区分各个 mod 的一个英文字符串 id，其各类用途会在其他章节中提及。值得注意的是，此参数中的 modid 必须对应 mods.toml 中填写的 modid。

而正如前文所提，FML 会自动构造 Mod 主类的一个实例，这也说明了 Mod 主类中必须有一个无参构造器。而这个构造器会在 Mod 加载初期实例化时调用，需要在构造期完成的任务可以写在该构造器中。

### FML 生命周期事件

在编写 Mod 的过程中，我们经常需要在 Mod 加载的的不同时期在不同的逻辑段进行不同的任务。FML 使用事件来帮助 Modder 达成这个目标。因此 FML 内存在一类事件，其中推送的事件并非游戏内发生的事件，而是 FML 在 Mod 加载过程中的的一系列过程，故我们称之为 FML 生命周期事件，而推送他们的事件总线被称为 MOD 总线。可以藉由 ```FMLJavaModLoadingContext.get().getModEventBus()``` 获取。FML 以此让我们得以在正确的时机，在正确的逻辑端进行正确的行为。例如我们不能在连方块注册都没有完成的情况下进行对应模型的注册，再比如我们不需要，不会，也不能在服务端注册渲染逻辑。

::: tip
这里我们提到的逻辑端之类的概念，将会在之后的章节详细介绍。<br/>简而言之，不论是单机游玩还是联机游玩，游戏中需要执行的各种任务都是按照职能被划分到客户端执行和服务端执行两个类别中的。分清什么任务应当在哪一端执行至关重要，也应该是一名合格的 Modder 的基本素养之一。值得注意的是，大部分在服务端进行的注册任务在客户端同样需要进行，但是反之不亦然。
:::

FML 生命周期事件存在于 ```net.minecraftforge.fml.event.lifecycle``` 包中。除此之外，还有数个特殊的事件: 
- ```net.minecraftforge.event.RegistryEvent``` 中的子类
- ```net.minecraftforge.client.event.ModelBakeEvent``` 中的子类
- ```net.minecraftforge.client.event.ModelRegistryEvent```
- ```net.minecraftforge.client.event.ColorHandlerEvent``` 中的子类
- ```net.minecraftforge.client.event.ParticleFactoryRegisterEvent```
- ```net.minecraftforge.client.event.TextureStitchEvent``` 中的子类

也是在 MOD 总线中触发的。这些主要是为了方便 Modder 在适当的时机和端注册东西。这些事件被触发的时机和事件被预期的的用途大部分都相当详尽地写在了类中的注释里，或者是本身的名称就足够直观。我们希望读者可以自行翻阅代码，阅读注释，以培养自己解决问题的能力，同时对这些事件存在的意义有自己的，更深的理解，故不在这里做赘述了。

## 下章

接下来，我们将展示一个简单的 Mod 主类。

```java
package com.example.example_mod;

import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;

@Mod("example")
public class ExampleMod {
    public ExampleMod() {
        //Register listener via method reference
        FMLJavaModLoadingContext.get().getModEventBus().addListener(this::commonSetup);
        FMLJavaModLoadingContext.get().getModEventBus().addListener(this::clientSetup);   
    }

    private void commonSetup(final FMLCommonSetupEvent event) {
        //TODO: Some tasks to be done at both server and client side during mod initialization phase.
    }

    private void clientSetup(final FMLClientSetupEvent event) {
        //TODO: Some tasks to be done at only client side during mod initialization phase.(e.g. RenderingRegistry::registerEntityRenderingHandler etc.)
    }
}
```

以上代码中，我们在构造器内给总线注册了两个监听器以订阅事件。其中 ```commonSetup``` 会同时在服务端和客户端中被触发，而 ```clientSetup``` 只会在客户端被触发。对生命周期事件触发流程的详情请参见 ```net.minecraftforge.fml.ModLoader```。
