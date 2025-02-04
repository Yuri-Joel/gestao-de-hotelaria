import { PropertiesList } from '@/components/propriedades/PropertiesList';
import React from 'react';
import { fakeProperties } from '@/data/properties';
const page: React.FC = () => {
  return (
    <div className=' bg-gray-50 flex items-center justify-center'>
      <div className='bg-white w-[700px] h-full px-4 py-6 shadow-xl rounded-md'>
        <PropertiesList  
          data={fakeProperties}
        />
      </div>
    </div>
  );
}

export default page;