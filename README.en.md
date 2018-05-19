__English | [中文](./README.md)__
# Insect Robot
Control an insect using your cell phone.  
>This project is greatly inspired by [Backyardbrains/Roboroach](https://github.com/backyardbrains/roboroach).  

<!-- Insert images here -->

## To begin with
```Shell
git clone --recursive https://github.com/genelocated/insect-robot.git
```
#### Hardware
Open file `hard/insect-robot.brd` using  Eagle 7.7.0, select `Files > CAM Processor...`.  
Select `Files > Open > Job...`, open `gerb274x.cam`, process the job.  
Open job `excellon.cam`, then process it.  
Send the gerber files generated to PCB factory.

#### Firmware of controlled
Open `avr/controlled/insectRobot.atsln` in Atmel Studio, Run `Build > Build solution`.    
Hex file generated is `Debug/controlled.hex`, boot it to the chip using Avrdude. You may need AVR asp for it.  
Also, you need a [FPC to DIP 6p adapter](https://www.amazon.com/s/?field-keywords=fpc+dip+6p).

#### Phone cilent
Install [WeChat](https://play.google.com/store/apps/details?id=com.tencent.mm).  
Scan this mini program code in WeChat `> Discover > Scan QR code`:  
<img alt='QRcode' width='300' src='https://user-images.githubusercontent.com/31200881/40267482-84c31bc2-5b8f-11e8-92a8-6d1d5c3509b5.jpg'></img>

## License
![license](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg)  
This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
