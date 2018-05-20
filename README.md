__中文 | [English](./README.en.md)__
# Insect Robot
用你的手机控制一只昆虫。  
>This project is greatly inspired by [Backyardbrains/Roboroach](https://github.com/backyardbrains/roboroach).  

<!-- Insert images here -->

## 开始
```Shell
git clone --recursive https://github.com/genelocated/insect-robot.git
```
#### 硬件
用 Eagle 7.7.0 打开 `hard/insect-robot.brd` 文件，选择 `文件 > CAM 处理器...` 。  
`文件 > 打开 > 作业...` , 打开 `gerb274x.cam` , 处理作业。  
打开作业 `excellon.cam` , 处理作业。  
将生成的 gerber 文件发给 pcb 打样厂。

#### 被控端固件
用 atmel studio 打开 `avr/controlled/insectRobot.atsln` , 运行 `build > build solution` 。  
生成的 hex 文件为 `Debug/controlled.hex` , 用 avrdude 或 progisp 烧录。需要用到 AVR asp。  
你还需要买一块 [FPC 6p 转接板](https://s.taobao.com/search?q=fpc+转接板+直插)。

#### 手机端
用微信扫描以下二维码打开小程序：  
<img alt='QRcode' width='300' src='https://user-images.githubusercontent.com/31200881/40267482-84c31bc2-5b8f-11e8-92a8-6d1d5c3509b5.jpg'></img>

## 许可协议
本项目为开源硬件项目。

[![license](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg)](https://creativecommons.org/licenses/by-sa/4.0/deed.zh)  
该项目本身采用[知识共享署名-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-sa/4.0/deed.zh)进行许可。  
小程序使用 MIT 协议进行许可。
