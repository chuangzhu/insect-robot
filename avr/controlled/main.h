/*
 * main.h
 *
 * Created: 2018/4/28 22:28:03
 *  Author: geneLocated
 */ 


#ifndef MAIN_H_
#define MAIN_H_

#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>
#include "../lib/TIMER/HAL_TIMER.h"
#include "../lib/USART/HAL_USART.h"

//Pins definitions.
#define RXD		PORTD0
#define TXD		PORTD1
#define BCTS	PORTD2
#define LINK	PORTD3
#define BRTS	PORTD4

#define CI_42fbc97
//This commit corrected LED pins,
//but I haven't send it for manufactor yet.
#if defined(CI_f84fea8)
	#define ledR PORTB0
	#define ledG PORTB1
	#define ledB PORTB2
#elif defined(CI_42fbc97) 
	#define ledR PORTB2
	#define ledG PORTB0
	#define ledB PORTB1
#endif

#define eleLeft		PORTC1
#define eleRight	PORTC0

#define set(Reg, Bit)	Reg |= (1<<Bit)		//Set a bit of reg.
#define clr(Reg, Bit)	Reg &= ~(1<<Bit)	//Clear a bit of reg.
#define not(Reg, Bit)	Reg ^= (1<<Bit)		//Reverse a bit of reg.

#define dutyPeriod 256
unsigned char rDuty;
unsigned char gDuty;
unsigned char bDuty;

#define colorLED(red, blue, green) {\
	rDuty = red;\
	gDuty = blue;\
	bDuty = green;}

#endif /* MAIN_H_ */
