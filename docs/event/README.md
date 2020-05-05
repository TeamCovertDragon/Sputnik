# 事件

## 什么是事件？

简单来说，事件是某种事物从无到有的过程。

原本玩家站在那好好地，突然有个僵尸从后面打了它一下，好了这个过程就是一个 `LivingHurtEvent`。

订阅事件的方法有时候也会叫“回调”（Callback）。
订阅事件可以简单理解为“出现 X 事件的时候记得调用我的方法 A，我需要处理这个事件。”

## 为什么要有事件？

干涉原版行为。

Minecraft 本身没有完整的事件系统，但是 Forge 的目标之一是让“不同的 Mod 能共同工作”。
基于这个目标，Forge 引入了一套事件系统来解决“一堆 Mod 干涉同一个原版内容”的问题。
你只要正确订阅事件，就基本不用担心自己的 Mod 会和别的 Mod 冲突了。

## 如何订阅事件

大概就像这样：

```java
@SubscribeEvent
public static void onEntityHurt(LivingHurtEvent event) {
    // 无条件取消所有玩家受到的一切伤害。
    if (event.getEntityLiving() instanceof PlayerEntity) {
        event.setCanceled(true);
    }
}
```

有鉴于事件订阅的方式实在是太多，[特此单开一节来讨论](why-my-events-do-not-work.md)。