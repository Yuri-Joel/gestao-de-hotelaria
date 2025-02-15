import React from 'react';
import { Wrapper } from '@/components/Wrapper';
import { UhList } from '@/components/quartos/Uhlist/Uhlist';

function page() {
  return (
    <Wrapper
      title='CADASTRO - Quartos'
      description='Adicione, edite ou exclua os seus quartos'
      children={<UhList />}
    />
  );
}

export default page;