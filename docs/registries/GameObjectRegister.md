# 注册预制物

> 前置知识：
> 
> - [事件](../event/)
> - [RL]()
 ## 注册表
 
 对于很多读者来说，注册一个属于自己的方块/物品是一件十分开心的事情。其实注册预制物没有大家想象中那么困难。
 
 在 Minecraft 里，每一种预制物类型都有一个表，我们称为注册表，这个表里有游戏中属于这个预制物类型的所有，预制物，我们可以在注册阶段对这个表进行诸如：增加，删除等修改，在注册阶段结束后，就不能修改这个表了。
 
 为了让我们可以很容易的知道什么时候要注册这个预制物，forge 提供了这样一个事件告诉我们这个时机，这个事件就是`RegistryEvent.Register<T>`，这是一个泛型事件，T 可以替换成你要修改的那个预制物类型的类，例如：`RegistryEvent.Register<Item>` 就是获取到注册物品的时机。
 
::: warning
这个事件需要在 MOD 总线上注册，而不是 forge 总线。
:::

## 其他注册表操作

既然可以注册，那我们同时也可以覆盖注册，简而言之就是把原有的预制物覆盖掉，变成我们的新的预制物。

## 如何注册

结合以上信息我们可以很清楚的知道如何注册。

首先我们要有一个要注册的预制物。

```java
new Item(new Item.Properties().group(ItemGroup.MISC)).setRegistryName("examplemod:test")
```

然后在注册事件中注册这个物品。

```java
@SubscribeEvent
public static void onItemsRegistry(final RegistryEvent.Register<Item> itemRegistryEvent) {
    LOGGER.info("HELLO from Register Item");
    //注册一个新物品
    itemRegistryEvent.getRegistry().register(new Item(new Item.Properties().group(ItemGroup.MISC)).setRegistryName("examplemod:test"));
    //覆盖注册原版物品
    itemRegistryEvent.getRegistry().register(new EggItem(new Item.Properties().group(ItemGroup.MISC)).setRegistryName("minecraft:apple"));
}
```

然后，打开游戏，在创造物品栏（MISC）中就能看到这个物品了。

接下去你可以阅读[简单的模组](./exmaple-simple-mod)来学习更多关于物品和方块的知识。