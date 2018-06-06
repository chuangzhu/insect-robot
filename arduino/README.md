__中文 | [English](./README.en.md)__

# 使用 Arduino IDE 编程

打开 Arduino IDE，在工具中将开发板和处理器设置为如图所示。

![arduinotools](https://user-images.githubusercontent.com/31200881/41056701-9e120888-69f7-11e8-8de0-b245d15c21a7.png)

打开 `arduino.ino`，选择“导出已编译的二进制文件”。

![arduinoexport](https://user-images.githubusercontent.com/31200881/41056468-d9f0d9fc-69f6-11e8-9d83-78d364e1ee45.png)

你需要购买一个 USBasp，一个 USBasp 10p 6p 转接板，以及一个 DIP FPC 6p 转接板。下载并打开 [PROGISP 1.72]()，将芯片设为 `ATmega168P`，然后点击“调入 Flash”调入刚刚导出的 `arduino.ino.eightanaloginputs.hex`。

![progisp](https://user-images.githubusercontent.com/31200881/41062384-4411fa94-6a08-11e8-92a6-d4cec1362297.png)

点击“编程熔丝”右边的框，将熔丝配置为如图所示，点击“写入”。在这一步之前，你要打开电路板上的开关。

![fuse](https://user-images.githubusercontent.com/31200881/41062709-34d0aeda-6a09-11e8-8f96-8b7e57be11fe.png)

最后点击“自动”写入程序。