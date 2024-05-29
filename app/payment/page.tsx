"use client"
import CheckoutForm from '../../components/Payment/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'

function Payment() {

    const stripePromise = loadStripe('pk_test_51PLWLXSENmD9TQa7YyWLjlTnr09DUEcWBw3qM5JlRUUvklmfYiANxKraP8z420LGQuqLDaP6uiZnFWMmlRuRVZwE00GlVobxy7')
    const options: any = {
        mode: 'payment',
        amount: 10,
        currency: 'usd',
    }
    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    )
}

export default Payment