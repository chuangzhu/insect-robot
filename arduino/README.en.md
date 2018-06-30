__English | [中文](./README.md)__

# Program using Arduino IDE

## Preparation

Locate at your Arduino config folder, it should one of the listed below:

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

Open `packages/arduino/hardware/avr/1.6.21/boards.txt`, insert this content at the beginning of the file:

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

Besides, you may need a [USBtinyISP](https://www.amazon.com/s/field-keywords=USBtinyISP) to program.

## Let's start

Connect the board, the programmer and your computer in the way as is shown in the photo:

![connectprogrammer]()

Open Arduino IDE, select "Insect Robot" for board and "USBtinyISP" for programmer in "Tools" menu.

![arduinotools](https://user-images.githubusercontent.com/31200881/42127073-bb9cd0b0-7cc4-11e8-959a-01f46d0fe6da.png)

Then press "Upload Using Programmer" in the "Sketch" menu.

![uploadwithprogrammer](https://user-images.githubusercontent.com/31200881/42127272-c8001dc8-7cc7-11e8-8e84-f8576215b504.png)

