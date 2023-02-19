import {FcGoogle} from "react-icons/fc";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {auth} from "../../utils/firebase";
import {useRouter} from 'next/router';
import { Router } from "next/router";
import {useAuthState} from "react-firebase-hooks/auth"
import { useEffect } from "react";


export default function Login(){

    //using this to reroute pages
        
        const [user, loading] = useAuthState(auth);
    //goolgle sign code
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            route.push("/");
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const route =  useRouter();

        if(user){
            route.push("/")
        }else{
            console.log("login")
        }
    },[user])

    return(
        <div className="border-4 mt-32 p-10 text-white-700 rounded-lg">
            <h2 className="text-2xl font-medium text-center">Sign in options</h2>
            <div className="py-4">
                
                <button onClick={GoogleLogin} className="bg-white rounded-lg w-full flex align-middle p-4 gap-2 text-black font-medium"> < FcGoogle className="text-2xl"/> Sign in with Google</button>
                    
            </div>

        </div>
    )
}