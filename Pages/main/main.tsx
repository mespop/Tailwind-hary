import { useEffect, useState } from "react";
import {  db } from "../../config/firebase";

import {getDocs,collection} from "firebase/firestore";
import { Post } from "./post";
export interface Post {
    id:string;
    userId:string;
    username:string;
    title:string;
    description:string;
}
export const Home = () =>{
    const postRef = collection(db,"post");
    const [postList,setPostList] = useState<Post[] | null>(null);
    const getPost = async ()=>{
        const data = await getDocs(postRef);
        setPostList(data.docs.map((doc)=>({...doc.data(), id:doc.id})) as Post[]);
    }
    useEffect(()=>{
        getPost();
    },[]);
    return(
        <div className="post-box">

            <div className="lo1">
                {postList?.map((post)=> (
                <Post post={post}/>
                ))}
            </div>
        </div>
    )

}