"use client"
import CheckoutForm from '../../components/Payment/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react'

function Payment() {
    const stripePromise = loadStripe('pk_test_51PKxIESHUYC3IlZExvLb7zM8lyV2S94KV06Zhm0P0id8G7WrCzGfZKpIjuTxd5KHHDyXd7H0zkLxnbej7769Mz6200zkcB2OlC')
    const options: any = {
        mode: 'payment',
        amount: 4500,
        currency: 'inr',
        layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: false,
            spacedAccordionItems: true
        }
    }
    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    )
}

export default Payment