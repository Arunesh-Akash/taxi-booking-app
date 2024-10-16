'use client'
import React, { useContext, useState } from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import Cars from './Cars';
import { Cards } from './Cards';
import { CarAmountContext } from '@/context/CarAmountContext';

export const Booking = () => {
  const { carAmount, setCarAmount } = useContext(CarAmountContext);
  return (
    <div className='p-5'>
      <h2 className='text-[20px] font-semibold'>Booking</h2>
      <div className=' border-[1px] rounded-md p-5 mt-2' style={{ height: '100%' }}>
        <AutocompleteAddress />
        <Cars />
        <Cards />
        <form action="http://localhost:3000/api/create-checkout-session" method="POST">
          <button className={`w-full bg-yellow-400 rounded-md mt-4 p-1 ${!carAmount ? 'bg-gray-200' : null}`}
            disabled={!carAmount}
            type='submit'>Book</button>
        </form>
      </div>
    </div>
  )
}
