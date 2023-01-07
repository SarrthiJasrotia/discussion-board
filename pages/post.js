import { useAuthState} from "react-firebase-hooks/auth";
import {auth,db} from "../utils/firebase";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";


export default function Post(){
    // state of the form
    const [post,setPost] = useState({description:""})
   
    // function for submitting the post

    const submitPost = async (e)=> {
        e.preventDefault();
    }
    return(
        <div className="my-20 p-12 border-2 rounded max-w-md mx-auto ">
            <form onSubmit={submitPost}>
                <h1>New Post</h1>
                <div>
                    <h3>Description</h3>
                    <textarea value={post.description} onChange={(e) =>setPost({...post,description: e.target.value})} className="bg-yellow-500 h-48 w-full text-white rounded-lg p-2"></textarea>
                    <p>{post.description.length}/300</p>
                </div>
                <button type="submit" className="w-full bg-red-500 rounded-md p-2 my-2">Submit</button>
            </form>
        </div>
    )
}
