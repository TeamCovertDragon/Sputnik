# 事件

## 什么是事件？

::: details 玄乎其玄的解释，可以跳过
简单来说，事件是某种事物从无到有的过程。

原本玩家站在那好好地，突然有个僵尸从后面打了它一下，好了玩家受到伤害的这个过程便是一个 `LivingHurtEvent`。  
再或者，突然游戏启动了，Mod 们开始加载了，触发了 `FMLCommonSetupEvent` 等若干个事件。
:::

订阅事件可以简单理解为“出现 X 事件的时候记得调用我的方法 A，我需要处理这个事件。”

## 为什么要有事件？

干涉原版行为。

Minecraft 本身没有完整的事件系统，所以我们不能轻易干涉原版逻辑。  
但是修改原版逻辑又确实是 Mod 开发过程中所需要用到的，比如不同 Mod 在玩家受到伤害时可能会想要提供不同程度的伤害减免。
因此，我们需要一套能让好几个 Mod 同时需要对同一处逻辑进行修改，并且又能够同时工作的机制。  
为此，Forge 引入了一套事件总线。

## 术语

  - 发布：指调用 `IEventBus#post(Event)` 方法。  
    会立刻调用所有订阅此事件的监听器。换言之，这是*同步*的。
  - 取消：指 `Event#setCanceled(boolean)` 这个方法。  
    通常所谓“取消事件”指的就是调用 `setCanceled(true)`。  
    所有可以取消的事件都有 `@Cancelable` 标记。试图取消不可取消的事件会抛出异常。  
    “取消事件”的含义由这个事件本身定义。
  - 结果：某些事件可以有一个“结果”。这些有结果的事件都有 `@HasResult` 标记。  
    结果有三种：允许（`ALLOW`）、拒绝（`DENY`）和默认（`DEFAULT`）。  
    事件“结果”的含义由这个事件本身定义。

## 如何订阅事件

首先我们要写一个方法。这个方法只有一个参数，而且一定是我们要订阅的事件：

```java
public class FirstEventListener {
    @SubscribeEvent
    public static void onEntityHurt(LivingHurtEvent event) {
        // 对于 LivingHurtEvent，取消事件意味着“这次伤害无效”。
        // 换言之，下面的代码可以无条件取消所有玩家实体受到的一切伤害。
        if (event.getEntityLiving() instanceof PlayerEntity) {
            event.setCanceled(true);
        }
    }
}
```

根据发布事件所用的事件总线（Event Bus），订阅事件的位置也不一样。对于上面这个例子，是：

```java
MinecraftForge.EVENT_BUS.register(FirstEventListener.class);
```

或者，有一个看起来像是回调（Callback）的写法。若使用这个写法，`@SubscribeEvent` 可省略：

```java
MinecraftForge.EVENT_BUS.addListener(FirstEventListener::onEntityHurt);
```

关于事件订阅的细节，可以[参考这里](why-my-events-do-not-work.md)。