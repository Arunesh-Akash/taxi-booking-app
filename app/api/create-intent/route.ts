import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51PLWLXSENmD9TQa7TBokd7erHKDpr5vdKTUvfZmjocuNCCwkBzoFiEUrGLDSG38M6GTupPWcjN24ojjG0XnlwGOy00UZF67B45');

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const amount = data.amount;
        const name=data.name;

        const paymentIntent = await stripe.paymentIntents.create({
            description: 'Software development services',
            shipping: {
                name: name,
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            },
            amount: Number(amount) * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            }
        });

        return NextResponse.json({ client_secret: paymentIntent.client_secret }, { status: 200 });
    } catch (error: any) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
