/*
 * controlled.c
 *
 * Created: 2018/4/28 20:59:13
 * Author : geneLocated
 */ 

#include "main.h"
#include <string.h>

unsigned char ledDuty[3] = {0};

/** Give random color using a hanging ADC port as random seed */
#define randColor(yourColor) {\
	ADC_Init();\
	for (unsigned char i = 0; i<3; i++) {\
		srand(ADConvert(3) + ADConvert(6));\
		yourColor[i] = rand() % ledPeriod;\
	}\
	ADC_Disenable();\
}

int main(void)
{
	DDRD = (1<<TXD)|(1<<BRTS);
	DDRB = (1<<ledR)|(1<<ledG)|(ledB<<1);
	//Hi-Z state if both DDRCn & PORTCn is 0
	DDRC = 0x00 /* (1<<eleLeft)|(1<<eleRight) */;
	USART_Begin();
	_delay_ms(128);
	USART_SendData("TTM:REN-$sect\r\n", 17);
	_delay_ms(128);
	randColor(ledDuty);
	USART_SendData("TTM:ADD-", 8);
	USART_SendData((char*)ledDuty, 3);
	_delay_ms(255);
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
				modeFlag = eleMode;
		}
		else if (modeFlag == eleMode)
		{
			modeFlag = noMode;
			if (!strcmp(usartBuf, "LLL"))
				pwmElePin = eleLeft;
			else if (!strcmp(usartBuf, "RRR"))
				pwmElePin = eleRight;
			set(DDRC, pwmElePin);
			TIMER0_Init();
		}
	}
	usartIndex ++;
	if (usartIndex > 2)
		usartIndex = 0;
}

//unsigned char pwmElePin;

/** Used for PWM of electrode */
ISR(TIMER0_OVF_vect)
{
	TIMER0_Reset();
	static unsigned char ovfStep = 0;
	static unsigned int eleTime = 0;
	if (ovfStep == eleDuty)
		clr(PORTC, pwmElePin);
	ovfStep ++;
	eleTime ++;
	if (ovfStep >= (elePeriod - 1))
	{
		ovfStep = 0;
		set(PORTC, pwmElePin);
	}
	if (eleTime >= (eleTimeout - 1))
	{
		eleTime = 0;
		clr(DDRC, pwmElePin);
		clr(PORTC, pwmElePin);
		TIMER0_Disable();
	}
}

//    ledPeriod
//  |<----------->|
//              __            __
//             |  |          |
//   __________|  |__________|
//
//  |<-------->|             |<>|
//    ledDuty            (ledPriod - ledDuty)

/** Used for PWM of RGB LED */
ISR(TIMER2_OVF_vect)
{
	TIMER2_Reset();
#if ledPeriod <= 256
	static unsigned char ovfStep = 0;
#elif ledPeriod <= 65536
	static unsigned int ovfStep = 0;
#endif
	if (ovfStep == ledDuty[0])
		set(PORTB, ledR);
	if (ovfStep == ledDuty[1])
		set(PORTB, ledG);
	if (ovfStep == ledDuty[2])
		set(PORTB, ledB);
	ovfStep ++;
	if (ovfStep >= (ledPeriod - 1))
	{
		ovfStep = 0;
		PORTB = 0x00;
	}
}
