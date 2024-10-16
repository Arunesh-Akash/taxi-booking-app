"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import Logo from '../assets/Logo.png'
import { useRouter } from 'next/navigation'


export default function Navbar() {
  const route = useRouter();
  return (
    <div className='flex justify-between p-3 px-10 border-b-[1px] shadow-sm'>
      <div className='flex gap-10 items-center'>
        <div>
          <Image src={Logo} alt='' width={60} height={50} className='rounded-full' />
        </div>
        <div className='hidden md:flex gap-6'>
          <h2 className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all' onClick={() => route.push('/')}>Home</h2>
          <h2 className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>History</h2>
          <h2 className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>Help</h2>
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
