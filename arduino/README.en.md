__English | [中文](./README.md)__

# Program using Arduino IDE

Open Arduino IDE, modify board and processor in Tools as is shown in the graph.

![arduinotools](https://user-images.githubusercontent.com/31200881/41056701-9e120888-69f7-11e8-8de0-b245d15c21a7.png)

Open `arduino.ino`, select "Export compiled Binary"

![arduinoexport](https://user-images.githubusercontent.com/31200881/41056468-d9f0d9fc-69f6-11e8-9d83-78d364e1ee45.png)

You may need a USBasp, a USBasp 10p to 6p adapter and a DIP to FPC 6p adapter. Download and open [AVRDUDESS](http://blog.zakkemble.co.uk/avrdudess-a-gui-for-avrdude/), open flash file exported just now `arduino.ino.eightanaloginputs.hex`. Fill the form as is shown in the graph. Turn on __the switch on the board__, then press the `Write` button on `Fuse & lock bits`. Finally, press the __`Program!`__ button.

![avrdudess](https://user-images.githubusercontent.com/31200881/41063962-b7de063a-6a0c-11e8-8ef6-051105ab9fdf.png)
