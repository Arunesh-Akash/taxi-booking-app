'use client'
import React, { useState } from 'react'
import CardsList from '../data/CardsList'
import Image from 'next/image'

export const Cards = () => {
    const [activeIndex,setActiveIndex]=useState<any>()
  return (
    <div>
        <h2 className='text-[14px] font-medium'>Payment Methods</h2>
        <div className='grid grid-cols-5 mt-2 pl-2'>
            {
                CardsList.map((item,index)=>(
                    <div className={`w-[50px] border-[1px] flex justify-center items-center rounded-md cursor-pointer hover:border-r-yellow-400 hover:scale-110 transition-all ${activeIndex==index ?'border-yellow-400 border-[2px]':null}`}
                    onClick={()=>setActiveIndex(index)}
                    >
                        <Image src={item.image} 
                        alt={item.name}
                        height={50}
                        width={30}/>
                        </div>
                ))
            }
        </div>
    </div>
  )
}
