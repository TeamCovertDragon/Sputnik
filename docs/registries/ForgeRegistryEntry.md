# 自定义预制物类型

有时候我们需要一个与 item，block 同级的东西。这时候我们就需要自定义预制物类型。

::: warning
大部分时候我们不需要怎么做。
:::


## 怎么做

自定义预制物类型很简单，只需要两步，新建一个`ForgeRegistryEntry`的子类，然后使用`RegistryBuilder`包装一下他。

首先我们需要一个类，这就是我们要注册的预制物类型。

```JAVA
public class Rock extends ForgeRegistryEntry<Rock> {
}
```

然后我们需要找一个地方把这个类包装一下，获取一个`IForgeRegistry`。

```JAVA
public static IForgeRegistry<Rock> ROCKS = new RegistryBuilder<Rock>().setType(Rock.class).setName(new ResourceLocation("examplemod", "rock")).allowModification().create();
```

最后我们就可以通过上文所说的方法注册预制物。

```JAVA
@SubscribeEvent
public static void onRocksRegistry(final RegistryEvent.Register<Rock> rockRegistryEvent) {
    LOGGER.info("HELLO from Register Rock");
    rockRegistryEvent.getRegistry().register(new Rock().setRegistryName("big"));
    rockRegistryEvent.getRegistry().register(new Rock().setRegistryName("small"));
}
```

## 最后的提示

在上文代码中我们出现了，`IForgeRegistry` 这个东西，如果有时候我们需要根据预制物的资源位置（RL）来获取这个预制物，我们就可以到这个地方寻找需要的函数。