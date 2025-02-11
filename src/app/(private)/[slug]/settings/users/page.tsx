import React from 'react';
import { Wrapper } from '@/components/Wrapper';
import { UserList } from '@/components/settings/users/UsersList';

function page() {
    return (
        <div className=" p-8">
            <Wrapper title='CONFIGURAÇÕES - Usuarios' description=''>
                <UserList />
            </Wrapper>

        </div>
    );
}

export default page;