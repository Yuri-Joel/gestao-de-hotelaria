"use client"
import { PropertyBody } from '@/components/propriedades/PropertyBody';
import React from 'react';


const page: React.FC = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white w-full h-full px-4 py-6 shadow-xl rounded-md mx-5'>
        <PropertyBody/>
      </div>
    </div>
  );
}

export default page;