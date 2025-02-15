"use client"
import React from 'react';

import { PropertyBody } from '@/components/propriedades/PropertyBody';

const page: React.FC = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white w-full h-full px-4 py-6 mx-5'>
        <PropertyBody />
      </div>
    </div>
  );
}

export default page;