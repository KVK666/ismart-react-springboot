import React, { useState } from "react";
import { useAuth } from "../security/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./MovieReviewApp.css"

export default function LoginComponent() {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const navigate = useNavigate()

    const authContext = useAuth()

    


    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    function handleUserPasswordChange(event) {
        setUserPassword(event.target.value);
    }

    const [showErrorMessage, setShowErrorMessage] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        authContext.login(userName, userPassword)
        .then((isLoginSuccessful)=>{
            
            if (isLoginSuccessful) {
                navigate(`/welcome/${userName}`);
            } else {
                setShowErrorMessage(true);
            }
        })
        .catch((error) => {

            console.error(error);
            setShowErrorMessage("Invalid username or password");
        });
        
        
    }

    
    return (


        //     <div className="Container m-5">
        //     <h1>Time to Login!</h1>
        //     <div className="card m-5" style={{padding:"50px"}}>
        //         <div className="form-control mb-3">
        //             <label>User Name :</label>
        //             <input type="text" name="userName" placeholder = "Enter your username" value={userName} onChange={handleUserNameChange}/>
        //         </div>
        //         <div className="form-control mb-3">
        //             <label>Password :</label>
        //             <input type="password" name="userPassword" placeholder="Enter your password" value={userPassword} onChange={handleUserPasswordChange}/>
        //         </div>
        //         <div>
        //             <button className="btn btn-outline-primary form-control mb-3 rounded-0 " type="button" onClick={handleSubmit}>Login</button>
        //         </div>
        //     </div>
        // </div>

        <div className="login-box">
            <h2>Login</h2>
            <form>
                <div className="user-box">
                    <input type="text" name="userName"  value={userName} onChange={handleUserNameChange}/>
                        <label>Username</label>
                </div>
                <div className="user-box">
                    <input type="password" name="userPassword"  value={userPassword} onChange={handleUserPasswordChange}/>
                        <label>Password</label>
                </div>
                <a href="#" onClick={handleSubmit}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </a>
                <Link className="register" to={'/register'} >Register</Link>
                {showErrorMessage && <p className="text-danger">{showErrorMessage}</p>}
            </form>
        </div>
    );
}
