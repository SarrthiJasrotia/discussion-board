import Link from "next/link"

export default function Nav(){
    return (
       <nav className="flex justify-between item-center py-10">
            <Link href="/">
            <button className="text-lg font-medium">Discussion Board</button>
            </Link>
            <ul className="flex items-center gap-10">
                <Link href="/auth/login">
                    <button className="py-2 px-4 text-sm bg-red-500 text-white rounded-lg font-medium">login</button>
                </Link>
            </ul>
       </nav>
    )
}
    
