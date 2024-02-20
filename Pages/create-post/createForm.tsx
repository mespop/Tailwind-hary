import { useForm } from "react-hook-form"
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup"
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Form.css";
import { useNavigate } from "react-router-dom";

interface CreateFormData{
    title:string;
    description:string;
}



export const CreateForm=()=>{
    const schema = yup.object().shape({
        title:yup.string().required("you must write title"),
        description:yup.string().required("you must write desciption"),
        
    })
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const {register,handleSubmit,formState:{errors},} = useForm<CreateFormData>({
        resolver:yupResolver(schema),
    })

    const onCreatepost = async (data : CreateFormData)=>{
       await addDoc(postRef,{
        ...data,
        username : user?.displayName,
        userId:user?.uid,
       });

        navigate("/");

    }

    const postRef = collection(db,"post");
    return(




    <form onSubmit={handleSubmit(onCreatepost)}>
        <input className="fo" type="text" placeholder="title"   {...register("title")} />
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea className="fo" placeholder="description" {...register("description") } />
        <p style={{color:"red"}}>{errors.description?.message}</p>

        <input className="fo1" type="submit" />

        
    </form>
    )
}