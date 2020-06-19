# 第一个方块：岩盐矿

我们梳理一下需求：

  - 一个普通的方块，叫「岩盐矿石」
  - 挖掘掉落岩盐
  - 受时运影响
  - 可以精准采集
  - 外观和原版钻石矿石完全一致
  - 不掉落经验，因为本质上不是钻石
  - 在创造物品栏的建筑方块里可以找到
  - 除此之外无其他特性

## 从注册方块开始

方块也是需要注册的。

```java
import net.minecraft.block.material.Material;

public final class MyBlocks {
    // 最后的 "my_mod" 照旧是 mod id。
    private static final DeferredRegister<Block> BLOCKS = new DeferredRegister<>(ForgeRegistries.BLOCKS, "my_mod");

    // register 方法除了这次是 Block 以外其他的不变。
    // 注意我们直接复用了原版的 Block 类——因为它没有任何特别的功能。
    // 我们通过 Block.Properties#from 方法直接复制原版钻石矿的
    // 所有基本属性到我们自己的方块上。
    public static final RegistryObject<Block> ROCK_SALT_ORE = ITEMS.register("rock_salt_ore", 
        () -> new Block(Block.Properties.from(Blocks.DIAMOND_ORE)));

    public MyBlocks(IEventBus theBus) {
        BLOCKS.register(theBus);
    }
}
```

然后在 Mod 主类里调用：

```java{8-9}
@Mod("my_mod")
public final class MyMod {
    public MyMod() {
        final IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();
        bus.addListener(this::commonSetup);
        bus.addListener(this::clientSetup);
        bus.addListener(this::serverSetup);
        new MyItems(bus);
        new MyBlocks(bus);
    }
}
```

## 战利品表

方块的掉落由战利品表控制，我们会在后面的章节详细说明战利品表。
这里我们把钻石矿的战利品表复制过来改一改好了——这玩意实在是太长了……
后面我们会介绍自动生成这玩意的 Data Generator，这里先按下不表。

新建 `data/my_mod/loot_tables/blocks/rock_salt_ore.json` 并填入以下内容：

```json
{
  "type": "minecraft:block",
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "minecraft:alternatives",
          "children": [
            {
              "type": "minecraft:item",
              "conditions": [
                {
                  "condition": "minecraft:match_tool",
                  "predicate": {
                    "enchantments": [
                      {
                        "enchantment": "minecraft:silk_touch",
                        "levels": {
                          "min": 1
                        }
                      }
                    ]
                  }
                }
              ],
              "name": "my_mod:rock_salt_ore"
            },
            {
              "type": "minecraft:item",
              "functions": [
                {
                  "function": "minecraft:apply_bonus",
                  "enchantment": "minecraft:fortune",
                  "formula": "minecraft:ore_drops"
                },
                {
                  "function": "minecraft:explosion_decay"
                }
              ],
              "name": "my_mod:rock_salt"
            }
          ]
        }
      ]
    }
  ]
}
```

## 方块不是物品

有必要指出一点，方块不是物品。
在玩家背包中只能存在物品。但「放置方块」是一个非常普通的需求，所以原版有一个专门的 `BlockItem` 来应对这个需求。

`BlockItem` 是一种「手持右键其他方块时，会在合适的位置放置方块，然后数量减一」的物品。所以我们需要注册一个新物品。还是刚才的 `MyItems` 类：

```java
public final class MyItems {

    private static final DeferredRegister<Item> ITEMS = new DeferredRegister<>(ForgeRegistries.ITEMS, "my_mod");

    public static final RegistryObject<Item> ROCK_SALT = ITEMS.register("rock_salt", 
        () -> new Item(new Item.Properties().group(ItemGroup.MISC)));

    // 使用 Supplier 可以非常简单地处理这种需要引用其他字段的情况。
    // 这也是我们在这里推荐使用 RegistryObject 的原因。
    public static final RegistryObject<Item> ROCK_SALT_ORE = ITEMS.register("rock_salt_ore",
        () -> new BlockItem(MyBlocks.ROCK_SALT_ORE.get(), new Item.Properties().group(ItemGroup.BUILDING_BLOCKS)))

    public MyItems(IEventBus theBus) {
        ITEMS.register(theBus);
    }
}
```

## 方块模型

我们首先要写一个 BlockState JSON，它为一个方块所有可能的「状态」都指定了一个模型。

因为我们直接用了 `Block`，没有任何别的东西，所以我们只有一个「默认状态」，这个状态在 BlockState JSON 里用 `""` 表示。

```json
{
    "variants": {
        "": { "model": "my_mod:block/rock_salt_ore" }
    }
}
```

我们就这样将这个默认状态的模型指向了 `assets/my_mod/models/block/rock_salt_ore.json` 上。新建这个文件并填入：

```json
{
    "parent": "minecraft:block/diamond_ore"
}
```

到此完工。

接下来启动游戏，你应该能在创造模式物品栏里找到这个以假乱真的「岩盐矿」并能放置下来了。*You salty now?*