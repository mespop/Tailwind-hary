import { auth,provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Page.css';



export const Login = () =>{
    const navigate= useNavigate();
    const SigninGoogle=async()=>{
        const result=await signInWithPopup(auth,provider);
        console.log(result);
        navigate('/');

    }


    return(
        <div className="lo">
            
        <div className="lolo">This is Login page login here</div>
        <button className="lolo1" onClick={SigninGoogle}>Sign in with google</button>
        
        </div>
    )

}