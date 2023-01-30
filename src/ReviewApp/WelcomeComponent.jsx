import {  Link, useNavigate } from "react-router-dom"
import { useAuth } from "../security/AuthContext"
import Cards from "./Cards";
import "./MovieReviewApp.css";
function WelcomeComponent(){

    
    

    const authContext = useAuth()
    const navigate=useNavigate()

    if (!authContext.isAuthenticated) {
        navigate("/login");
        return null;
    }



    return (
        <div className="Welcome">
            <h1 className="bot" style={{textAlign:"left",margin:"40px"}}><strong>Welcome {authContext.userName}</strong></h1>
            {/* <div>
                List of movies - <Link to="/movies">Click here</Link>
            </div> */}
            <div className="list__cards">
                {
                    <Cards/>
                }
            </div>
        </div>
    )
}

export default WelcomeComponent