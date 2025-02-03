import Link from 'next/link';
import React from 'react';

const page: React.FC = () => {
    const slug = "algo" 
    return (
        <div>
            <h1>Login</h1>
            <Link href={`/${slug}/reservas`}>
            Ir em reservas
            </Link>
        
        </div>
    );
}

export default page;