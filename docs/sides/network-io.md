# 网络 I/O

> 前置知识：
> 
> - [服务端与客户端](README.md)

## 概述

网络 I/O 是客户端、服务端之间交换数据的手段，例如服务端发送一个数据包以告知客户端某个熔炉的状态有更新，亦或者是客户端向服务端发送一个数据包告知服务端用户输入了某个命令。

## 数据包

在 Minecraft 中，大多数的数据交换都是通过发送 “数据包” 实现的。一般来说，一次数据包的传送需要经过以下过程：

1. 构建数据包
2. **序列化**————发送端将数据包中所有的内容全部转化成一段字节
3. 传送————将这段字节从发送端传送至接收端
4. **反序列化**————接收端读取这段字节并重新构造出数据包
5. **处理数据包**————接收端通过对应的处理器（Handler）处理数据包

## Minecraft 接管的网络 I/O

许多需要在服务端、客户端之间同步信息的逻辑已经被 Minecraft 本身完成了，包括但不限于：

- 命令
    - 注册命令的 execute 块是在服务端被调用的，我们不需要手动同步
- TileEntity
    - [待搬运](https://harbinger.covertdragon.team/chapter-07/tile-entity-sync.html)
- 实体
    - [待搬运](https://harbinger.covertdragon.team/chapter-07/entity-sync.html)

## 使用 SimpleNetworkWrapper 进行自定义的网络 I/O

虽然 Minecraft 已经实现了许多的网络 I/O 的逻辑，但是对于 Modder 来说这些当然是不够用的。  
当我们需要同步一些自定义的数据的时候，就需要自己注册新的数据包类型并指定相关的逻辑了。自定义网络 I/O 的方式有很多，这里笔者介绍最简单的一种解决方案————使用 SimpleNetworkWrapper 。

要使用 SimpleNetworkWrapper 自定义网络 I/O ，我们需要做几件事：

- 注册自己的 SimpleChannel
- 实现自定义数据包的**序列化**、**反序列化**与**处理**
- 注册自定义数据包

### 上 代 码

#### 注册自己的 SimpleChannel
```java
public class NetworkManager {
    private static final String PROTOCOL_VERSION = "1.0";

    /* 
    注册自己的 SimpleChannel
    四个参数的意义分别是：
    频道的名字
    返回当前 “网络协议版本” 的 Supplier<String>
    检测 “客户端是否兼容某网络协议版本” 的谓词
    检测 “服务端是否兼容某网络协议版本” 的谓词

    在这里，我们强制要求服务端和客户端的协议版本（PROTOCOL_VERSION）必须一致，所以后两个参数传入的都是 PROTOCOL_VERSION::equals
    */
    public static SimpleChannel INSTANCE = NetworkRegistry.newSimpleChannel(
            new ResourceLocation("mymodid", "main"),
            () -> PROTOCOL_VERSION,
            PROTOCOL_VERSION::equals,
            PROTOCOL_VERSION::equals
    );

    // 不允许产生该类的实例
    private NetworkLoader() {
        throw new UnsupportedOperationException("No instance");
    }
}
```

::: details 谓词与 `Supplier`
什么是**Supplier**？

`Supplier<T>` 可以理解为一个返回值类型为 `T` 的函数，上文的代码使用了 lambda 表达式简写该 `Supplier<String>` ： `() -> PROTOCOL_VERSION` ，完整的形式实际上是：

```java
new Supplier<String> {
    @Override
    public String get() {
        return PROTOCOL_VERSION;
    }
}
```

为了便于理解，读者可以想象其意义等同于这样一个方法：

```java
String foo() {
    return PROTOCOL_VERSION;
}
```

什么是**谓词**？

谓词也是一个函数，它的返回值是一个 `boolean` ，并且含有一个参数。上文的 `PROTOCOL_VERSION::equals` 是一个方法引用，它也可以被改写成：

```java
new Predicate<String>() {
    @Override
    public boolean test(String s) {
        return PROTOCOL_VERSION.equals(s);
    }
}
```

或者：

```java
(s) -> PROTOCOL_VERSION.equals(s)
```

关于 lambda 表达式和方法引用的更多内容，读者可以自行学习。本文后面也会用到相似的写法，将不再赘述。

:::

#### 实现自己的数据包

```java
public class MyPacket {
    // 我们的新数据包只携带了一个 String 类型的数据
    public String myData;

    public MyPacket(String data) {
        this.myData = data;
    }

    // 负责序列化的函数
    public static void encode(MyPacket packet, PacketBuffer pb) {
        // PacketBuffer 为我们提供了 writeString 方法，用于将 String 转化为一串字节
        // 该方法的第二个参数是最大的字节长度，这里我们指定为 114514 个字节
        pb.writeString(packet.myData, 114514);
    }

    // 负责反序列化的函数
    public static MyPacket decode(PacketBuffer pb) {
        // 这个时候字节流已经从发送端传送到接收端了，所以这里的代码是在接收端运行的
        // 我们通过 PacketBuffer::readString 方法读取出刚刚写入的 String 数据，并返回反序列化的结果
        // 如果在序列化阶段向 PacketBuffer 中写入了多个数据，务必用与序列化阶段**相同的顺序**从 PacketBuffer 读取数据！！
        return new MyPacket(pb.readString());
    }

    // 负责处理数据包的函数
    // 第一个参数当然是自己的数据包
    // 第二个参数提供了一个 NetworkEvent.Context 实例，它包括了许多信息，如这个数据包的发送方向，发送这个数据包的玩家等等
    public static void handle(MyPacket packet, Supplier<NetworkEvent.Context> ctx) {
        // 这里我们的 “处理机制” 是简单的把这个 String 数据打印出来
        System.out.println(packet.myData);
        // 别忘了要标记这个数据包被处理过了
        ctx.get().setPacketHandled(true);
    }
}
```

::: danger
这里有一点小细节：handle 方法实际上会在对应业务端的网络线程上被调用，此时访问大多数游戏对象都会有线程安全的问题。

如果读者需要在这里操作游戏对象，请务必使用以下格式：

```java
public static void handle(MyPacket packet, Supplier<NetworkEvent.Context> ctx) {
    // 给主线程的队列添加一个 “任务”
    ctx.get().enqueueWork(() -> {
        // 这里的代码会在主线程上被执行，所以在这里可以安全的访问游戏对象
        // 因为这些代码会在主线程上执行，一定要考虑到执行效率的问题，否则会造成严重的 tps 降低
    });
    // 一定不要忘了标记这个数据包已经被处理了
    ctx.get().setPacketHandled(true);
}
```
:::

::: danger
实现服务端的 handler 时一定要注意逻辑严密：客户端发来的任何数据包都可以是伪造的，因此 Packet 中的内容都是不可信的，唯一可信的是 Context 中包含的信息（例如发送这个数据包的玩家），这个 handler 可能会以任何一种形式被用来攻击服务器。

千万不要在这里不经过任何检查就进行一些危险操作，例如破坏某个方块或是给予某个实体伤害，不经过检查就方位某个方块（可能会导致异常的区块加载）。同时，如果 handler 会给游戏的主线程增加任务，也应确保这些任务不会因为数据包里伪造的数据而占用大量的主线程时间，让心怀不轨的玩家轻易就可以让服务器变得十分卡顿甚至崩溃。

甚至反序列化的时候也要注意：有经验的黑客甚至可以通过反序列化库的 RCE 实现在服务端上执行恶意代码。
:::

#### 注册自己的数据包

```java
public class NetworkLoader {
    // 在 NetworkLoader 中添加这样一个方法用于注册数据包
    // 别忘了要在合适的时机（FMLCommonSetupEvent 就很合适）调用该方法！
    public static void registerPackets() {
        // INSTANCE 是之前注册的 SimpleChannel 实例
        // registerMessage 的第一个参数是要注册数据包的 unique id，请确保每个数据包的 unique id 不同
        // 第二个参数的意义是 “要注册数据包的类” ，这里当然是 MyPacket.class
        // 后面几个参数依次是数据包的序列化器、反序列化器以及处理器，这里直接用方法引用传入之前写好的三个函数
        INSTANCE.registerMessage(0, MyPacket.class, MyPacket::encode, MyPacket::decode, MyPacket::handle);
    }
}
```

#### 那我该怎么发送数据包啊？

```java
public class NetworkLoader {
    // 客户端给服务端发送数据包
    public static void playerSendToServer(MyPacket packet) {
        INSTANCE.sendToServer(packet);
    }

    // 服务读端给特定玩家发送数据包
    public static void serverSendToPlayer(MyPacket packet, ServerPlayerEntity player) {
        INSTANCE.send(PacketDistributor.PLAYER.with(() -> player), packet);
    }

    // 服务端给所有玩家发送数据包
    public static void serverSendToAllPlayers(MyPacket packet) {
        INSTANCE.send(PacketDistributor.ALL.noArg(), packet);
    }
}
```

除此之外其实还有一些发送数据包的方法，例如给某个维度的玩家发送数据包，读者可以自行探索，这里不再赘述。
