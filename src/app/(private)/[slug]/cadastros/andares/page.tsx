"use client"
import React from 'react';
import { fakeAndar } from '@/utils/api/guest';
import { Wrapper } from '@/components/Wrapper';
import { FloorList } from '@/components/FloorList/FloorList';
const page: React.FC = () => {
    
  return (
    <Wrapper title='CADASTROS-ANDARES' children={
    <div className='flex items-center justify-center'>
      <div className='bg-white w-full h-full px-4 py-6 shadow-xl rounded-md mx-5'>
        <FloorList  
          data={fakeAndar}
        />
      </div>
    </div>
    }/>
  );
}

export default page;