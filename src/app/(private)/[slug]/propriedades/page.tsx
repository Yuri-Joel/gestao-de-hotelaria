"use client"
import { PropertiesList } from '@/components/propriedades/PropertiesList';
import React from 'react';
import { fakeProperties } from '@/utils/api/properties';

const page: React.FC = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white w-full h-full px-4 py-6 shadow-xl rounded-md mx-5'>
        <PropertiesList  
          data={fakeProperties}
        />
      </div>
    </div>
  );
}

export default page;