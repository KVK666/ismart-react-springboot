import {  Link, useNavigate } from "react-router-dom"
import { useAuth } from "../security/AuthContext"
function WelcomeComponent(){

    
    

    const authContext = useAuth()
    const navigate=useNavigate()

    if (!authContext.isAuthenticated) {
        navigate("/login");
        return null;
    }



    return (
        <div className="Welcome">
            <h1>Welcome {authContext.userName}</h1>
            <div>
                List of movies - <Link to="/movies">Click here</Link>
            </div>
        </div>
    )
}

export default WelcomeComponent