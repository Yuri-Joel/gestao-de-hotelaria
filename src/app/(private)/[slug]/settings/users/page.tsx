"use client"
import React, { useEffect } from 'react';
import { Wrapper } from '@/components/Wrapper';
import { UserList } from '@/components/settings/users/UsersList';
import { parseCookie } from '@/helpers/cookies/authCookie';
import { userStore } from '@/store/userStore';

function page() {
    const {
        find,
        currentPage,
        users
    } = userStore();

    useEffect(() => {
        (async () => {
            try {
                const res = await find(currentPage);
            } catch (error) {
                console.error("Erro ao buscar usuarios:", error);
            } finally {
            }
        })();
    }, [currentPage, find]);

    return (
        <Wrapper title='CONFIGURAÇÕES - USUÁRIOS' description=''>
            <UserList data={users} />
        </Wrapper>
    );
}

export default page;