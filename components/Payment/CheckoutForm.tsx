"use client"
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (elements == null) {
            return;
        }
        if(!stripe){
            return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
            return
        }
        const res = await fetch("http://localhost:3000/api/create-intent", {
            method: "POST",
            body: JSON.stringify({
                amount: 58
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const {client_secret: clientSecret} = await res.json();
        const { error } = await stripe.confirmPayment(
            {
                clientSecret,
                elements,
                confirmParams: {
                    return_url: "http://localhost:3000",
                },
            }
        )
        if(error){
            console.log(error)
        }

    }


    return (
        <div className='flex flex-col justify-center items-center w-full mt-6'>
            <form onSubmit={handleSubmit} className='max-w-md'>
                <PaymentElement />
                <button type='submit' disabled={!stripe || !elements} className='w-full bg-yellow-500 p-2 rounded-lg mt-2'>
                    Pay
                </button>
            </form>
        </div>
    )
}

export default CheckoutForm


// if (!stripe || !elements) {
//     return;
// }

// const result = await stripe.confirmPayment({
//     elements,
//     confirmParams: {
//         return_url: "http://localhost:3000",
//     },
// });


// if (result.error) {
//     console.log(result.error.message);
// } else {
//     console.log(result);
// }
//2nd method
// if (elements == null) {
//     return;
// }
// const { error: submitError } = await elements.submit();
// if (submitError) {
//     return
// }
// const res = await fetch("http://localhost:3000/api/create-intent", {
//     method: "POST",
//     body: JSON.stringify({
//         amount: 58
//     })
// })
// const sec = await res.json();
// const { error } = await stripe.confirmPayment(
//     {
//         clientSecret: sec,
//         elements,
//         confirmParams: {
//             return_url: "http://localhost:3000",
//         },
//     }
// )