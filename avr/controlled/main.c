/*
 * controlled.c
 *
 * Created: 2018/4/28 20:59:13
 * Author : geneLocated
 */ 

#include "main.h"

int main(void)
{
	DDRD = (1<<TXD)|(1<<BRTS);
	DDRB = (1<<ledR)|(1<<ledG)|(ledB<<1);
	DDRC = (1<<eleLeft)|(1<<eleRight);
	USART_Begin();
	colorLED(0, 0, 0);
	TIMER2_Init();
	sei();
	while (1) 
	{
	}
}

ISR(USART_RX_vect)
{
	PORTB = UDR0;
	if (UDR0 == 'L')
		;//set(PORTC, eleRight);
	else if (UDR0 == 'R')
		;//set(PORTC, eleLeft);
}

/* Used for PWM of electrode */
ISR(TIMER0_OVF_vect)
{
	
}

// 	  dutyPeriod
//  |<----------->|
// 	            __            __
//             |  |          |
//   __________|  |__________|
//
// 	|<-------->|             |<>|
// 	  rDuty            (dutyPriod - rDuty)

/* Used for PWM of RGB LED */
ISR(TIMER2_OVF_vect)
{
	static unsigned ovfStep = 0;
	if (ovfStep == rDuty)
		set(PORTB, ledR);
	if (ovfStep == gDuty)
		set(PORTB, ledG);
	if (ovfStep == bDuty)
		set(PORTB, ledB);
	ovfStep ++;
	if (ovfStep >= dutyPeriod)
	{
		ovfStep = 0;
		PORTB = 0x00;
	}
}
