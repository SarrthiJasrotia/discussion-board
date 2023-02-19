import { useAuthState} from "react-firebase-hooks/auth";
import {auth,db} from "../utils/firebase";
import Router, { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { doc,addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { updateDefaultClause } from "typescript";

export default function Post(){
    const route = useRouter();
    const routeData = route.query;
    const [user,loading] = useAuthState(auth);
    // state of the form
    const [post,setPost] = useState({description:""})
   
    // function for submitting the post

    const submitPost = async (e)=> {
        e.preventDefault();


        //make sure it fits the requirements
        if (!post.description){
            toast.error('Description cannot be left blank');

            return;
        }
        if (!post.description.length > 300){
            toast.error('Description exeeds the charater limit');
            
            return;
        }
        
        if(post?.hasOwnProperty("id")){
            const docRef = doc(db, 'posts',post.id);
            const updatedPost = {...post, timestamp: serverTimestamp()};
            await updateDoc(docRef, updatedPost);
            return route.push('/')

        }else{
        
        //new post
        const  collectionRef = collection(db, 'posts')
        await addDoc(collectionRef, {
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            pfp: user.photoURL,
            username: user.displayName,
        });
        setPost({ description:""});
        toast.success("New post was made")
        return Router.push("/");
    }
    };

    //edit
    const checkUser = async () => {
        if (loading) return;
        if (!user) return route.push("/auth/login");
        if (routeData.id){
            setPost({description: routeData.description, id: routeData.id})
        }
    };

    useEffect(() =>{
        checkUser();
    }, [user,loading]);

    return(
        <div className="my-20 p-12 border-2 rounded max-w-md mx-auto ">
            <form onSubmit={submitPost}>
                <h1 className="text-xl text-center">{post.hasOwnProperty('id') ? "Edit Post" : "New Post"}</h1>
                <div>
                    <h3>Description</h3>
                    <textarea value={post.description} onChange={(e) =>setPost({...post,description: e.target.value}) } className="bg-yellow-500 h-48 w-full text-white rounded-lg p-2"></textarea>
                    <p className={`text-white ${post.description.length > 300 ? 'text-red-500' :""}`}> {post.description.length}/300</p>
                </div>
                <button type="submit" className="w-full bg-red-500 rounded-md p-2 my-2">Submit</button>
            </form>
        </div>
    )
}
