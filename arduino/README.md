__中文 | [English](./README.en.md)__

# 使用 Arduino IDE 编程

## 准备工作

打开你的 Arduino 配置文件夹，它应该是以下其一：

```
\Arduino15\ (Windows, Arduino IDE 1.6.6 and newer)
\Arduino\ (Windows, Arduino IDE 1.0.6 and older)
\Documents\ArduinoData\ (Windows app version)
~/Library/Arduino15/ (Max OS X, Arduino IDE 1.6.0 and newer)
~/Library/Arduino/ (Max OS X, Arduino IDE 1.0.6 and older)
~/.arduino15/ (Linux, Arduino IDE 1.6.0 and newer)
~/.arduino/ (Linux, Arduino IDE 1.0.6 and older)
<Arduino IDE installation folder>/portable/ (when used in portable mode)
```

打开该目录下的 `packages\arduino\hardware\avr\1.6.21\boards.txt`，在文件开头粘贴以下内容：

```makefile
insrobo.name=Insect Robot

insrobo.upload.tool=avrdude
insrobo.upload.protocol=arduino

insrobo.bootloader.tool=avrdude
insrobo.bootloader.unlock_bits=0x3F
insrobo.bootloader.lock_bits=0x0F

insrobo.build.board=AVR_PRO
insrobo.build.core=arduino
insrobo.build.variant=eightanaloginputs

insrobo.upload.maximum_size=30720
insrobo.upload.maximum_data_size=2048
insrobo.upload.speed=57600

insrobo.bootloader.low_fuses=0xE2
insrobo.bootloader.high_fuses=0xD9
insrobo.bootloader.extended_fuses=0xFF
insrobo.bootloader.file=atmega/ATmegaBOOT_168_atmega328.hex

insrobo.build.mcu=atmega328p
insrobo.build.f_cpu=8000000L
```

此外，你还需要购买一个 [USBtinyISP](https://s.taobao.com/search?q=USBtinyISP)。

## 开始编程

如图所示连接电路板、编程器和电脑：

![connectprogrammer]()

打开 Arduino IDE，在工具中将开发板设置为 Insect Robot、编程器设置为 USBtinyISP。

![arduinotools](https://user-images.githubusercontent.com/31200881/42126882-7e425fb2-7cc1-11e8-81e2-c7303ce2a1f5.png)

点击项目菜单中的”使用编程器上传“即可。

![uploadwithprogrammer](https://user-images.githubusercontent.com/31200881/42126907-12483d12-7cc2-11e8-8768-9d493d116665.png)

