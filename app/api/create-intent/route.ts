import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"
const stripe = new Stripe('sk_test_51PKxIESHUYC3IlZEcB1bzNEewbONE2uKjpLanrhSRWje1B7nAoTOdhaR1akYPhDDWyvUdJmOUGxhtUeexByLTZdJ00MnhaGv2J')
export async function POST(request: NextRequest) {

    const data: any = await request.json()
    const amount = data.amount

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount),
            currency: 'inr',
        })
        return NextResponse.json({ client_secret: paymentIntent.client_secret }, { status: 200 })
    } catch (error: any) {
        console.log(error)
    }

}