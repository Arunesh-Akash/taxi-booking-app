import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51PLWLXSENmD9TQa7TBokd7erHKDpr5vdKTUvfZmjocuNCCwkBzoFiEUrGLDSG38M6GTupPWcjN24ojjG0XnlwGOy00UZF67B45');

export async function POST(request: NextRequest) {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'T-shirt',
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA','IN'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1500,
                            currency: 'usd',
                        },
                        display_name: 'Next day air',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1,
                            },
                        },
                    },
                },
            ],
            phone_number_collection:{
                enabled:true
            },
            mode: 'payment',
            success_url: 'http://localhost:3000',
            cancel_url: 'http://localhost:3000',
        });

        if (!session.url) {
            throw new Error('Failed to create checkout session');
        }
        console.log(session.url)
        return NextResponse.redirect(session.url);
    } catch (error: any) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}