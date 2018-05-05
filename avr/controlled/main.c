/*
 * controlled.c
 *
 * Created: 2018/4/28 20:59:13
 * Author : geneLocated
 */ 

#include "main.h"
#include <string.h>

/** Give random color using a hanging ADC port as random seed */
#define randColor(yourColor) {\
	ADC_Init();\
	for (unsigned char i = 0; i<3; i++) {\
		srand(ADConvert(3) + ADConvert(6));\
		yourColor[i] = rand() % 256;\
	}\
	ADC_Disenable();\
}

int main(void)
{
	DDRD = (1<<TXD)|(1<<BRTS);
	DDRB = (1<<ledR)|(1<<ledG)|(ledB<<1);
	DDRC = (1<<eleLeft)|(1<<eleRight);
	USART_Begin();
	randColor(ledDuty);
	TIMER2_Init();
	sei();
	while (1) 
	{
	}
}


char usartBuf[4] = {0, 0, 0, 0};
unsigned char modeFlag = 0;
#define noMode		(0)
#define eleMode		(1)

ISR(USART_RX_vect)
{
	static unsigned char usartIndex = 0;
	usartBuf[usartIndex] = UDR0;
	if (usartIndex == 2)
	{
		if (modeFlag == noMode)
		{
			if (!strcmp(usartBuf, "EL:"))
			{
				modeFlag = eleMode;
			}
		}
		else if (modeFlag == eleMode)
		{
			modeFlag = noMode;
			if (!strcmp(usartBuf, "LLL"))
			{
				set(PORTC, eleLeft);
				_delay_ms(10);
				clr(PORTC, eleLeft);
			}
			else if (!strcmp(usartBuf, "RRR"))
			{
				set(PORTC, eleRight);
				_delay_ms(10);
				clr(PORTC, eleRight);
			}
		}
	}
	usartIndex ++;
	if (usartIndex > 2)
		usartIndex = 0;
}

/** Used for PWM of electrode */
ISR(TIMER0_OVF_vect)
{
	
}

//    dutyPeriod
//  |<----------->|
//              __            __
//             |  |          |
//   __________|  |__________|
//
//  |<-------->|             |<>|
//    ledDuty            (dutyPriod - ledDuty)

/** Used for PWM of RGB LED */
ISR(TIMER2_OVF_vect)
{
	static unsigned ovfStep = 0;
	if (ovfStep == ledDuty[0])
		set(PORTB, ledR);
	if (ovfStep == ledDuty[1])
		set(PORTB, ledG);
	if (ovfStep == ledDuty[2])
		set(PORTB, ledB);
	ovfStep ++;
	if (ovfStep >= dutyPeriod)
	{
		ovfStep = 0;
		PORTB = 0x00;
	}
}
