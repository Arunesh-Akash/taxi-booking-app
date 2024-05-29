'use client'
import React, { useContext, useState } from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import Cars from './Cars';
import { Cards } from './Cards';
import { useRouter } from 'next/navigation';
import { CarAmountContext } from '@/context/CarAmountContext';

export const Booking = () => {
  const { carAmount, setCarAmount } = useContext(CarAmountContext);
  const router: any = useRouter()
  return (
    <div className='p-5'>
      <h2 className='text-[20px] font-semibold'>Booking</h2>
      <div className=' border-[1px] rounded-md p-5 mt-2' style={{ height: '100%' }}>
        <AutocompleteAddress />
        <Cars />
        <Cards />
        <button className={`w-full bg-yellow-400 rounded-md mt-4 p-1 ${!carAmount ? 'bg-gray-200' : null}`}
          disabled={!carAmount}
          onClick={() => router.push('./payment')} >Book</button>
      </div>
    </div>
  )
}
