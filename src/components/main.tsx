import React, { ReactNode } from 'react';

export const Main = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex-grow flex justify-center items-center">
            {children}
        </main>
    )
}