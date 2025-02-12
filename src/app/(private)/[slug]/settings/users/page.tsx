import React from 'react';
import { Wrapper } from '@/components/Wrapper';
import { UserList } from '@/components/settings/users/UsersList';

function page() {
    return (
            <Wrapper title='CONFIGURAÇÕES - Usuarios' description=''>
                <UserList />
            </Wrapper>
    );
}

export default page;