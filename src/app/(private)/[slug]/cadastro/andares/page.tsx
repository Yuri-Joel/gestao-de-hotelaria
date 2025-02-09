import React from 'react';
import { FloorList } from '@/components/FloorList/FloorList';
import { Wrapper } from '@/components/Wrapper';

function page() {
  return (
    <div className=" p-8">
      <Wrapper
        title='CADASTRO - ANDARES'
        description='Adicione, edite ou exclua os seus andares'
        children={<FloorList />}
      />
    </div>
  );
}

export default page;