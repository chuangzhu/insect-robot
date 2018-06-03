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
#include <stdlib.h>
#include <string.h>
#include "../lib/TIMER/HAL_TIMER.h"
#include "../lib/USART/HAL_USART.h"
#include "../lib/ADC/HAL_ADC.h"

//Pins definitions.
#define RXD		PORTD0
#define TXD		PORTD1
#define BCTS	PORTD2
#define LINK	PORTD3
#define BRTS	PORTD4

#define eleLeft		PORTB2
#define eleRight	PORTB1

//This commit corrected LED to PWM pins,
#define ledR PORTD5	//OC0B
#define ledG PORTD6	//OC0A
#define ledB PORTB3	//OC2A

#define PWM_0B_ENABLE
#define PWM_0A_ENABLE
#define PWM_2A_ENABLE
#include "../lib/PWM/HAL_PWM.h"

#define set(Reg, Bit)	Reg |= (1<<Bit)		//Set a bit of reg.
#define clr(Reg, Bit)	Reg &= ~(1<<Bit)	//Clear a bit of reg.
#define not(Reg, Bit)	Reg ^= (1<<Bit)		//Reverse a bit of reg.

unsigned char ledDuty[3];

#define elePeriod	30		//*10us
#define eleDuty		20		//*10us
#define eleTimeout	1000	//*10us

unsigned char pwmElePin;

#define TIMER1_Disable() clr(TIMSK1, TOIE1)

#endif /* MAIN_H_ */
