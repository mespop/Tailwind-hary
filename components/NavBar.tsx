import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import "./Navbar.css";
import {signOut} from 'firebase/auth'


export const Nav = ()=>{
    const [user] = useAuthState(auth);
    const SignUserOut=async()=>{
        await signOut(auth)
    }
    return(

        
        <div className="nav"> 
            
        <div className="Li">
            <Link className="Link" to="/" >Home</Link>
            {!user?<Link className="Link" to="/login">Login</Link>:<Link className="Link" to="createpost" >createPost</Link>}
            

            
        </div>

            <div className="user">
        {user &&(
            <>
            <p >{user?.displayName}</p>
            <img src={user?.photoURL||""} alt="" />
            <button className="logout" onClick={SignUserOut}>Log Out</button>
            </>
            )
        }
        </div>

        </div>
    )

}