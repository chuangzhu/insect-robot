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
	PORTB = 0xFF;
	DDRC = (1<<eleLeft)|(1<<eleRight);
	USART_Begin();
	sei();
	while (1) 
	{
	}
}

ISR(USART_RX_vect)
{
	PORTB = UDR0;
}
