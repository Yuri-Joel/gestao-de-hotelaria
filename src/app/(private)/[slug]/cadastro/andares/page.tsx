import React from 'react';
import { FloorList } from '@/components/Floor/FloorList';
import { Wrapper } from '@/components/Wrapper';

function page() {
  return (
      <Wrapper
        title='CADASTRO - ANDARES'
        description='Adicione, edite ou exclua os seus andares'
        children={<FloorList />}
      />
  );
}

export default page;