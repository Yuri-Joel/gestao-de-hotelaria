import React from 'react';
import { Wrapper } from '@/components/Wrapper';
import { UhList } from '@/components/quartos/UhList/Uhlist';

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