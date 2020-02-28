# Sputnik

Sputnik 是 [Harbinger][ref-1] 的续作，为新版 Minecraft 而生。

```java{8-10}
package com.example.examplemod;

import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;

@Mod("examplemod")
public class ExampleMod {

    public ExampleMod() {
        FMLJavaModLoadingContext.get().getModEventBus().addListener(this::setup);
    }

    private void setup(final FMLCommonSetupEvent event) {
        System.out.println("Hello, Forge");
    }

}

```

[ref-1]: https://harbinger.covertdragon.team
