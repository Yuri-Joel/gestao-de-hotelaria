import { Header } from '@/components/propriedades/Header';
import { PropertiesList } from '@/components/propriedades/PropertiesList';
import React from 'react';

const page: React.FC = () => {
  return (
    <div className='h-screen bg-gray-300 flex items-center justify-center'>
      <div className='bg-white w-[700px] h-full px-4 py-6'>
        <PropertiesList />
      </div>
    </div>
  );
}

export default page;