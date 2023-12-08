"use client";
import { SparklesIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Input from './Input'
import { DocumentData, QueryDocumentSnapshot, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  useEffect(() =>
   onSnapshot(
    query(collection(db, "posts"), orderBy("timestamp", "desc")),
    (snapshot) => {
      const postData: QueryDocumentSnapshot<DocumentData>[] = snapshot.docs;
      setPosts(postData);
    }
   ), [])
  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]'>
      <div className='text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-[#000000af] backdrop-blur-md border-b border-gray-700'>
        <h1 className='text-lg sm:text:xl font-bold'>Home</h1>
        <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
            <SparklesIcon className="h-5 text-white"/>
        </div>
      </div>
      <Input/>

      <div className="pb-72">
       {posts.map(post => (
        <Post key={post.id} id={post.id} post={post.data()}/>
       ))}
      </div>
    </div>
  )
}

export default Feed