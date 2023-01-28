import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegisterComponent() {
    const [userName, setUserName] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [userNameError, setUserNameError] = useState("");
    const [userFirstNameError, setUserFirstNameError] = useState("");
    const [userLastNameError, setUserLastNameError] = useState("");
    const [userPasswordError, setUserPasswordError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);



    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    function handleUserFirstNameChange(event) {
        setUserFirstName(event.target.value);
    }

    function handleUserLastNameChange(event) {
        setUserLastName(event.target.value);
    }

    function handleUserPasswordChange(event) {
        setUserPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        setUserNameError("");
        setUserFirstNameError("");
        setUserLastNameError("");
        setUserPasswordError("");
    
        if (!userName) {
            setUserNameError("Username is required");
        }
        if (!userFirstName) {
            setUserFirstNameError("First name is required");
        }
        if (!userLastName) {
            setUserLastNameError("Last name is required");
        }
        if (!userPassword) {
            setUserPasswordError("Password is required");
        }
        if (userPassword.length < 8) {
            setUserPasswordError("Password must be at least 8 characters long");
        }
        if (!/\d/.test(userPassword) || !/[a-z]/.test(userPassword) || !/[A-Z]/.test(userPassword)) {
            setUserPasswordError("Password must contain at least one number, one lowercase letter, and one uppercase letter");
        }
    
        if (!userNameError && !userFirstNameError && !userLastNameError && !userPasswordError) {
            if (userName && userFirstName && userLastName && userPassword){
            axios.post('http://localhost:8765/user-service/registerNewUser', {
                userName: userName,
                userFirstName: userFirstName,
                userLastName: userLastName,
                userPassword: userPassword
            })
                .then(response => {
                    console.log(response);
                    setIsRegistered(true);
    
                })
                .catch(error => {
                    console.log(error);
                });
        }}
      }
    

    return (
        

        <div className="login-box">
            {/* {isRegistered ? (
                <div className="success-message">
                    <p>You have been registered successfully!</p>

                    <Link className="login-after-success" to={'/login'} >Login here</Link>
                </div>

            ) : (
                <> */}
                    <h2>Register</h2>
                    <form>
                        <div className="user-box">
                            <input type="text" name="userName" value={userName} onChange={handleUserNameChange} />
                            <label>Username</label>
                            {userNameError && <div className="error-message">{userNameError}</div>}
                        </div>
                        <div className="user-box">
                            <input type="text" name="userFirstName" value={userFirstName} onChange={handleUserFirstNameChange} />
                            <label>First Name</label>
                            {userFirstNameError && <div className="error-message">{userFirstNameError}</div>}
                        </div>
                        <div className="user-box">
                            <input type="text" name="userLastName" value={userLastName} onChange={handleUserLastNameChange} />
                            <label>Last Name</label>
                            {userLastNameError && <div className="error-message">{userLastNameError}</div>}
                        </div>
                        <div className="user-box">
                            <input type="password" name="userPassword" value={userPassword} onChange={handleUserPasswordChange} />
                            <label>Password</label>
                            {userPasswordError && <div className="error-message">{userPasswordError}</div>}
                        </div>
                        <a href="#" onClick={handleSubmit}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </a>
                        {isRegistered && <p className="registered" >Registered successfully</p>}

                    </form>

                {/* </> */}
            {/* )} */}
        </div>
    );
}

