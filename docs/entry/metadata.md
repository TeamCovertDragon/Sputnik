# `mods.toml`：Mod 元数据

Forge/FML 依靠一个位于 `META-INF/` 目录下名叫 `mods.toml` 的文件来了解你的 Mod 的基本信息。  
这个文件的扩展名表明这是个 [TOML](https://github.com/toml-lang/toml) 格式的文件。而“你的 Mod 的基本信息”包括但不限于这些东西：

  - 唯一识别 id
  - 名字
  - 版本号
  - 作者
  - 鸣谢名单
  - Logo
  - 依赖 Mod 清单
  - ……

## 我应该在 `mods.toml` 里写啥？

首先应该写的东西：

```toml
modLoader="javafml"
loaderVersion="[31,)"
issueTrackerURL="https://example.com"
license="All Rights Reserved"
```

|Key              |值类型   |我应该写什么？                     |
|:------          |:------ |:------                          |
|`modLoader`      |字符串   |`"javafml"`。我们会在以后再讨论这个。这一行必须有。|
|`loaderVersion`  |字符串   |一个数学上的区间。我们要定义的是“加载器的版本范围”，这个版本是 Forge 版本号的主版本号。比如 `31.1.37` 的 Forge，对应的“加载器的版本”是 `31`。`[31,)` 的意思自然是“大于等于 31”。这一行必须有。|
|`issueTrackerURL`|字符串   |你的 Mod 出了问题去哪里找你丢黑锅。一般来说是一个网址。这一行可以删掉，尤其是你想鸽了的时候。|
|`license`        |字符串   |你的 Mod 的许可证（license）。非常有用，因为它能直截了当地告诉用户他们可以拿你的 Mod 干什么，不能干什么。强烈建议使用 [SPDX Identifier][ref-1] 以方便机器处理。如果你不确定这是什么，强烈建议填入 `All Rights Reserved`（即「版权所有」）。|

[ref-1]: https://spdx.org/licenses/

### `[[mods]]`

然后你需要描述你的 Mod 了：

```toml
modLoader="javafml"
loaderVersion="[31,)"
issueTrackerURL="https://example.com"
license="All Rights Reserved"

[[mods]]
modId="my_mod"
version="${file.jarVersion}"
displayName="My First Mod"
updateJSONURL="https://example.com/foo.json"
displayURL="https://example.com"
logoFile="my_logo.png"
logoBlur=false
credits="Sputnik Contributors"
authors="Me!"
description="My first mod, please don't laugh on me."
```

|Key              |值类型   |我应该写什么？|
|:------          |:------ |:------|
|`modId`          |字符串   |你的 Mod 唯一识别 ID。长度不能超过 64 个字符。只能用小写英文字母、阿拉伯数字、下划线和连字符。这一行必须有，别和别的 Mod 重了。|
|`version`        |字符串   |你的 Mod 的版本号。这一行必须有。你可以写 `"${file.jarVersion}"` 然后在 `build.gradle` 里写一个自动替换的脚本。|
|`displayName`    |字符串   |你的 Mod 在游戏里的显示名字。这一行必须有。起一个好听的名字吧。|
|`displayURL`     |字符串   |你的 Mod 的网站。没有的话就删掉这一行吧。|
|`logoFile`       |字符串   |你的 Mod 的 logo 的文件名。必须是个 PNG 格式的图片。直接放 `resource/` 目录里。没有的话就删掉这一行吧。|
|`authors`        |字符串   |你的 Mod 的作者（们）。可以删掉，但是你肯定不会想删掉的。|
|`credits`        |字符串   |鸣谢列表。可以删掉，但……你大概率不会想删的。|
|`description`    |字符串   |你的 Mod 的简介。可以删掉，但是你不仅不会删，你还会想在这里长篇大论一番。|

### 一个 jar 里可以塞多个 Mod

只要你重复 `[[mods]]` 块即可。像这样：

```toml
[[mods]]
modId="my_mod_1"
version="${file.jarVersion}"
displayName="My First Mod"

[[mods]]
modId="my_mod_2"
version="${file.jarVersion}"
displayName="My Second Mod"

# ...
```

### Mod 依赖

最后你大概需要声明你要依赖的 Mod。如果你的 Mod 不依赖别的 Mod，那你可以跳过这一步。