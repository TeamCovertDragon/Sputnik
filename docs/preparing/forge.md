# Forge

Forge 是个 Mod 开发框架，包含了这么几个部分：

  1. Forge Mod Loader (FML)，用于识别并加载 Mod。
  2. Forge，主要有两部分：
    - 修改原版底层暴露出的 API。
    - 一些和 Minecraft 底层关系不是特别大的小系统，比如 Capability。

## 为什么我们要用 Forge？

  1. 在 Forge 的基础上开发 Mod 可以加快你的开发速度。  
     你可以直接使用 Forge 已经造好的轮子，这样你就不用花时间再自己造一遍了。
  2. 使用 Forge 可以保证你的 Mod 的和其他人的 Mod 的基本兼容。
     很久很久以前的 Minecraft Mod（具体来说是 beta 时代甚至更早）是直接拖进 `minecraft.jar` 本体中安装的。在那时，同时装两个甚至更多 Mod 是件难事。  
     专门的 Mod 加载器的出现改变了这个现状。Mod 加载器提供了一套标准化的和 Minecraft 打交道的方式，从而允许两个甚至更多 Mod 同时对同一个地方进行修改（比如注册方块）。
     在那个时候有各种各样的 Mod 加载器，但最终只有 Forge 和 FML 活了下来，最后这俩还合并了。
