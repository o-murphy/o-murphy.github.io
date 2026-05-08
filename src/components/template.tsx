import { Main } from "./main"
import { Footer } from "./footer"
import { Header } from "./header"
import { ReactNode } from "react"

export const Template = ({ children }: { children: ReactNode }) => {
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