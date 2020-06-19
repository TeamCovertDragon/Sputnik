# 第一个物品：岩盐

我们从一个最简单的物品开始：

  - 这个物品叫「岩盐」，也有叫「石盐」的，英文名 Rock Salt。
  - 模型和原版钻石一致。
  - 你可以在原版创造物品栏的「杂项」一栏中找到它。
  - 除此之外没有任何特别之处。

## 从注册物品开始

物品是非常典型的「需要注册才能使用的游戏对象」，所以我们要先注册这么一个物品。

```java
public final class MyItems {
    // 最后的 "my_mod" 是 mod id。
    private static final DeferredRegister<Item> ITEMS = new DeferredRegister<>(ForgeRegistries.ITEMS, "my_mod");

    // register 方法的第一个参数指定栏物品的注册名。
    // 第二个参数是要注册的物品的 Supplier。
    // 注意我们直接复用了原版的 Item 类——因为它没有任何特别的功能。
    // 我们通过 Item.Properties#group 方法来指定它在哪个创造标签页下。
    public static final RegistryObject<Item> ROCK_SALT = ITEMS.register("rock_salt", 
        () -> new Item(new Item.Properties().group(ItemGroup.MISC)));


    // Dependency injection。
    public MyItems(IEventBus theBus) {
        /* 
         * 一个比较反直觉的设计，DeferredRegister.register(IEventBus) 的用途
         * 是让 DeferredRegister 里的事件监听器注册进给定的事件总线里。
         */
        ITEMS.register(theBus);
    }
}
```

然后在 Mod 主类里调用就行了：

```java
@Mod("my_mod")
public final class MyMod {
    public MyMod() {
        final IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();
        bus.addListener(this::commonSetup);
        bus.addListener(this::clientSetup);
        bus.addListener(this::serverSetup);
        new MyItems(bus); // <-- 注意这一行
    }
}
```

## 语言文件

Minecraft 支持一大堆语言甚至是允许自定义新语言，所以我们不能把翻译写死进代码里。
关于语言文件的详细说明可参考[未完待续]，这里我们只说明需要的内容。

Minecraft 使用 JSON 作为语言文件的载体。

Minecraft 的默认语言是美式英文（ISO-639-1 `en_us`）。新建 `assets/my_mod/lang/en_us.json` 并填入：

```json
{
    "item.my_mod.rock_salt": "Rock Salt"
}
```

非常显然，我们需要简体中文（ISO-639-1 `zh_cn`）翻译。新建 `assets/my_mod/lang/zh_cn.json` 并填入：

```json
{
    "item.my_mod.rock_salt": "岩盐"
}
```

## 模型

我们的目标是和原版钻石外观一致，那么我们只需要让它使用原版钻石的物品模型即可。

新建 `assets/my_mod/models/item/rock_salt.json` 并填入：

```json
{
    "parent": "minecraft:item/diamond"
}
```

完工。

接下来启动游戏，你应该能在创造模式物品栏里找到这个以假乱真的「岩盐」物品了。*You salty now?*