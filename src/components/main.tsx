import React from 'react';

export const Main = ({ children }: { children: any }) => {
    return (
        <main className="flex-grow flex justify-center items-center">
            {children}
        </main>
    )
}