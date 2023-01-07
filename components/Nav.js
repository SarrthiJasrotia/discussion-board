import Link from "next/link"
import { auth } from '../utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";


export default function Nav() {

    // so I can use state to use for things such as if user is logged in or not
    const [user, loading] = useAuthState(auth)


    console.log("user",user)
    return (
        <nav className="flex justify-between item-center py-10">
            <Link href="/">
                <button className="text-2xl font-medium">Discussion Board</button>
            </Link>
            <ul className="flex items-center gap-10">

                {/* if no user show them the login button */}
                {!user && (<Link href="/auth/login">
                    <button className="py-2 px-4 text-sm bg-red-500 text-white rounded-lg font-medium">Login</button>
                </Link>)}

                {/*  if there is a user let them access the post and other features*/}
                {user && (< div className="flex items-center gap-6">
                    <Link href="/post">

                        <button  className="font-medium bg-yellow-500 text-white py-2 px-4 rounded-md text-sm"> Post</button>
                    </Link>

                    <Link href="/dashboard">
                        <img src={user.photoURL} className="w-12 rounded-full border-2"/>
                    </Link>

                </div>)}
            </ul>
        </nav>
    )
}

