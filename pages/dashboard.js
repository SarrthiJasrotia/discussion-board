import {auth,db} from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { async } from "@firebase/util";
import { useEffect,useState } from "react";
import {collection, onSnapshot, query, where,doc,deleteDoc} from "firebase/firestore";
import Feed from "../components/feed";
import {BsTrash2Fill} from "react-icons/bs";
import {AiFillEdit} from "react-icons/ai";
import Link from "next/link";


export default function Dashboard(){
    const route = useRouter();
    const [user,loading]= useAuthState(auth);
    const  [posts, setPosts] = useState([]);

    const getData =async () =>{
        if (loading) return;
        if (!user) return route.push("/auth/login");
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where('user','==',user.uid))
        const unsubscribe = onSnapshot(q, (snapshot =>{
            setPosts(snapshot.docs.map((doc)=> ({...doc.data(), id:doc.id})))
        }))
        return unsubscribe;
    };
   
    //delete function
    const deletePost = async (id) => {
        const docRef = doc(db,'posts', id )
        await deleteDoc(docRef)
    };

  

    useEffect(() => {
        getData();
    },[user,loading]);

    return (
        <div>
            <h1> My posts</h1>
            <div>{posts.map((post) => {
                return (
                <Feed {...post} key={post.id}>
                    <div className="flex gap-4">
                        <button onClick={ ()=> deletePost(post.id)} className="text-red-500 flex items-center justify-center text-xs"> <BsTrash2Fill className="text-xl"/> Delete</button>
                        <Link href={{ pathname: "/post" , query: post}}>
                           <button className="text-yellow-500 flex items-center justify-center text-xs"><AiFillEdit className="text-xl"/>Edit</button>
                        </Link>
                    </div>
                </Feed>
            );
            })}</div>
            
            <button className="font-medium text-white bg-gray-800 py-2 px-4 my-8 rounded" onClick={() => auth.signOut()}>Log Out</button>
            
        </div> 
    )
}