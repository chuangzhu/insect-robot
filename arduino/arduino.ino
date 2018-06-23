/* Don't save this file as "UTF-8 with BOM" */

// color ranges from 0x00 to 0xFF,
// we use an array of char to store r, g, b
// in this case we can send it via BLE boardcast
char ledColor[3];

void randColor() {
  for (int i = 0; i<3; i++) {
    // use the values read from unconnected analog pins as random seed
    randomSeed(analogRead(3) + analogRead(6));
    ledColor[i] = random(256);
  }
}

// LED pins
const int RED = 5;
const int GREEN = 6;
const int BLUE = 11;
// electrode pins
const int LEFT = 10;
const int RIGHT = 9;

void setup() {
  pinMode(RED, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(BLUE, OUTPUT);
  // a pin is in Hi-Z state when it is INPUT and LOW.
  // we only make these pins OUTPUT when we need to make them HIGH.
  // this measure prevented the possibility of
  // letting the current flows from one antenna to another.
  pinMode(LEFT, INPUT);
  pinMode(RIGHT, INPUT);
  randColor(); // get a random color
  // show this random color on the LED
  analogWrite(RED, 255 - ledColor[0]);
  analogWrite(GREEN, 255 - ledColor[1]);
  analogWrite(BLUE, 255 - ledColor[2]);
  Serial.begin(9600);
  delay(128);
  // rename the bluetooth low energy (BLE) module to '$sect'
  Serial.println("TTM:REN-$sect");
  // leave time for the module to deal with the task
  delay(128);
  // share the random color via BLE boardcast 
  Serial.print("TTM:ADD-");
  Serial.print(ledColor);
  delay(255);
}



// parameters for the impulse wave
const int impulsePeriod = 30; // *10us
const int impulseDuty = 20; // *10us
const int impulseTimeout = 1000; // *10us

boolean impulse = false;
int impulsePin;
int loopStep = 0;
int impulseTimes = 0;

//   impulsePeriod
//  |<----------->|
//   __________    __________      HIGH
//             |  |          |
//             |__|          |__   LOW
//
//  |<-------->|             |<>|
//   impulseDuty        (impulsePriod - impulseDuty)
//
//           |   zoom out
//           V
//        _   _   _   _   _   _   _
//  ------ |_| |_| |_| |_| |_| |_| |_------
//       |<------------------------->|
//              impulseTimeout

void loop() {
  if (impulse) {
    if (loopStep == impulseDuty) {
      digitalWrite(impulsePin, LOW);
    } else if (loopStep == impulsePeriod) {
      loopStep = 0;
      digitalWrite(impulsePin, HIGH); 
    }
    loopStep ++;
    if (impulseTimes == impulseTimeout) {
      impulseTimes = 0;
      impulse = false;
    }
    impulseTimes ++;
    delayMicroseconds(10);
  }
}



String inString = "";

void serialEvent() {
  while (Serial.available()) {
    char inChar = Serial.read();
    inString += inChar; // append to the string
    if (inString == "EL:LLL") {
      inString = "";
      impulsePin = LEFT;
      pinMode(impulsePin, OUTPUT);
      impulse = true; // start impulse wave
    } else if (inString == "EL:RRR") {
      inString = "";
      impulsePin = RIGHT;
      pinMode(impulsePin, OUTPUT);
      impulse = true;
    }
  }
}

