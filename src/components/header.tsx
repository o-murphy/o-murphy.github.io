import Link from 'next/link';


export const Header = () => {
    return (
        <header className="py-6 px-4 flex justify-start w-full">
            <Link href="/" className="hover:bg-black hover:text-white p-1">
                <h1 className="text-l underline">{"<Dmytro Yaroshenko>"}</h1>
            </Link>
        </header>
    )
}