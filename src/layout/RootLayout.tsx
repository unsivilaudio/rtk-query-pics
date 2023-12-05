import type { ReactNode } from 'react';

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <main className='container mx-auto mt-12 max-w-[48rem] rounded-lg bg-gradient-to-br from-[#514220] to-[#402424] px-8 pb-16 pt-4 shadow-xl'>
            {children}
        </main>
    );
}
