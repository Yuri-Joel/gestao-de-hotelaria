"use client";
import React, { useState, useEffect } from "react";
import SquareNav, { SquareNavItem } from "@/components/SquareNav/SquareNav";
import { Wrapper } from "@/components/Wrapper";
import Cookies from "js-cookie";

const page: React.FC = () => {
    const [slug, setSlug] = useState<String | null>(null);

    const navigationItems: SquareNavItem[] = [
        { title: "Usuários", href: `/${slug}/settings/users` },
    ]

    useEffect(() => {
        (async () => {
            const getSlug = Cookies.get(process.env.NEXT_PUBLIC_PROPERTY_SLUG as string) as string
            setSlug(getSlug);
        })()
    }, [])

    return (
        <Wrapper title="CONFIGURAÇÕES" >
            <SquareNav navigationItems={navigationItems} />
        </Wrapper>
    )
}

export default page;
