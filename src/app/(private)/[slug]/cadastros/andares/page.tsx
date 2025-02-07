"use client"
import React from 'react';
import { fakeAndar } from '@/utils/api/guest';
import { Wrapper } from '@/components/Wrapper';
import { FloorList } from '@/components/FloorList/FloorList';
const page: React.FC = () => {

  return (
    <Wrapper title='CADASTROS-ANDARES' children={
        <FloorList  
          data={fakeAndar}
        />
    }/>
  );
}

export default page;