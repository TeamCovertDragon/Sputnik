# 为什么我的事件订阅了没用？！

## 先检查你注册的方式

|你是这么注册的……|那你应该这样订阅……|方法的访问级别……
|:----|:----|:----|
|`@Mod.EventBusSubscriber(modid = "my_mod")`|`@SubscribeEvent public static void on(Event event)`|必须为 `public`|
|`MinecraftForge.EVENT_BUS.register(new MyEventListener())`|`@SubscribeEvent public void on(Event event)`|必须为 `public`|
|`MinecraftForge.EVENT_BUS.register(MyEventListener.class)`|`@SubscribeEvent public static void on(Event event)`|必须为 `public`|
|`MinecraftForge.EVENT_BUS.addListener(MyEventListener::on)`|`public static void on(Event event)`|无限制|
|`MinecraftForge.EVENT_BUS.addGenericListener(MyEventListener::on)`|`public static void on(GenericEvent<T> event)`|无限制|


## 再检查你是否用错了事件总线

下列事件应该出现在 Mod 加载总线上：

  - `FMLCommonSetupEvent`
  - `FMLClientSetupEvent`
  - `FMLDedicatedServerSetupEvent`
  - 所有 IMC 相关事件，包括：
    - `InterModEnqueueEvent`
    - `InterModProcessEvent`
  - `FMLLoadCompleteEvent`
  - `runData` 用到的 `GatherDataEvent`
  - 所有 `ModConfig.ModConfigEvent`，包括：
    - `ModConfig.ModConfigEvent.Loading`
    - `ModConfig.ModConfigEvent.Reloading`
  - 所有 `RegistryEvent.Register<T>`
  - 所有 `ColorHandlerEvent`，包括：
    - `ColorHandlerEvent.Block`
    - `ColorHandlerEvent.Item`
  - `ParticleFactoryRegisterEvent`
  - `TextureStitchEvent`（包括 `Pre` 和 `Post`）


一般来说，需要走 Mod 总线的事件都应当在 Mod 主类的构造器里就订阅完成：

```java
IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();

bus.register(...);
bus.addListener(...);
bus.addGenericListener(...);
```

或者，如果你用 `@Mod.EventBusSubscriber`：

```java
@Mod.EventBusSubscriber(bus = Mod.EventBusSubscriber.Bus.MOD, modid = "my_mod")
```
