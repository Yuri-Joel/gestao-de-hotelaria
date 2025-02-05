import { useEffect } from 'react';
import Head from 'next/head';

const HeadTitle = ({ title }: { title: string }) => {
    useEffect(() => {
        document.title = title || 'Hoteli Apps - PMS';
    }, [title]);

    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
};

export default HeadTitle;
