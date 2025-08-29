import { Main } from "./main"
import { Footer } from "./footer"
import { Header } from "./header"
import React from 'react';

export const Template = ({ children }: { children: any }) => {
    return (
        <div className="bg-white text-gray-800 font-mono antialiased flex flex-col min-h-screen">
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </div>
    )
}