'use client'
import React, { useContext, useState } from 'react';
import CarsList from '../data/CarsList';
import Image from 'next/image';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import { CarAmountContext } from '@/context/CarAmountContext';

const Cars = () => {
    const [selectedCar, setSelectedCar] = useState<any>();
    const { directionData, setDirectionData } = useContext(DirectionDataContext);
    const { carAmount, setCarAmount } = useContext(CarAmountContext);

    const getCost = (charges: any) => {
        return (charges * directionData.routes[0].distance * 0.0006213711192).toFixed(2)
    }

    return (
        <div className='mt-3'>
            <h2 className='font-semibold'>Select Car</h2>
            <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {CarsList.map((item: any, index: number) => (
                    <div
                        key={index}
                        className={`m-2 p-3 border-[1px] rounded-md hover:border-yellow-400 cursor-pointer ${index === selectedCar ? 'border-yellow-400 border-[2px]' : null}`}
                        onClick={() => {
                            setSelectedCar(index)
                            setCarAmount(getCost(item.charges))
                        }}
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            height={75}
                            width={90}
                            className='w-full'
                        />
                        <div className='flex justify-between items-center gap-1'>
                            <h2 className='text-[12px] text-gray-500'>{item.name}</h2>
                            {directionData.routes ?
                                <div className='flex justify-center items-center gap-1'>
                                    <span className='text-black text-[12px] font-medium'>₹ </span>
                                    <span className='text-black text-[12px] font-medium'>{getCost(item.charges)}</span>
                                </div>

                                : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cars;


