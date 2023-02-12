import Head from 'next/head'
import Feed from '../components/feed'
import { useEffect, useState}  from 'react';
import { db } from '../utils/firebase';
import { async } from '@firebase/util';
import { collection,onSnapshot,orderBy, query } from 'firebase/firestore';


export default function Home() {

  const [allposts,setAllPosts] = useState([]);

  const getPosts = async()=>{
    const collectionRef = collection(db,'posts');
    const q = query(collectionRef, orderBy('timestamp','desc'));
    const unsubscribe = onSnapshot(q,(snapshot)=>{
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
        
    })
    return unsubscribe;
  
  
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className='my-12 text-lg font-medium'>
      <h2 className='text-2xl text-center'> All posts</h2>
      
      
      </div>
    </>
  )
}
