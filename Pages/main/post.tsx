import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import {Post as IPost} from "./main";
import "./post.css";
import { addDoc, collection, getDocs, query, where,deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";


interface Props{
    post: IPost;
}
interface Like{
    userId: string;
    likeId: string;
}



export const Post = (props:Props)=>{
    const {post} = props;
    
    const [user] = useAuthState(auth);
    const likesRef = collection(db,"likes");
    const likesDoc = query(likesRef, where("postId","==",post.id));

    const getLikes = async ()=> {
        const data = await getDocs(likesDoc);
        
        setLikes(data.docs.map((doc)=>({userId: doc.data().userId,likeId:doc.id })));
    };
    
    const addLike = async ()=>{
        try{

            const newDoc=await addDoc(likesRef,{userId: user?.uid, postId: post.id });
            if(user){
                
                setLikes((prev)=>prev?[...prev,{userId:user.uid,likeId:newDoc.id}]:[{userId:user.uid, likeId:newDoc.id}]); 
            }
        } catch(err){
            console.log(err);
        }

    }
    const removeLike = async ()=>{
        try{
            const liketodeletequery = query(likesRef, where("postId","==",post.id), where("userId","==",user?.uid));
            const liketoDeleteData = await getDocs(liketodeletequery)
            const likeId = liketoDeleteData.docs[0].id;
            const liketodelete = doc(db,"likes",likeId);
            

            await deleteDoc(liketodelete);
            if(user){
                
                setLikes((prev)=>prev&&prev.filter((like)=>like.likeId!== likeId)); 
            }
        } catch(err){
            console.log(err);
        }

    }
    const [Likes,setLikes] = useState<Like[] | null>(null);

    const hasUserliked = Likes?.find((like)=>like.userId === user?.uid)
    
    
    useEffect(()=>{
        getLikes();
    }, []);
    
    
    return (

        <div className="indi-post">
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="desciption">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>--@{post.username}</p>
            </div>
            <div className="like">
                <button onClick={hasUserliked?removeLike:addLike}> {hasUserliked?<> &#128078; </>: <>&#128077;</>}</button>
            </div>
            {Likes&&<div>Likes: {Likes?.length}</div>}
        </div>
        )
}
