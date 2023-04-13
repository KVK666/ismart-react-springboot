import { createContext, useContext, useState } from "react";
import axios from "axios";



export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false)



    const [userName, setUserName] = useState(null)

    const [role, setRole] = useState(null)

    const [userFirstName,setUserFirstName]=useState(null)
    const [userLastName,setUserLastName]=useState(null)

    const valueToBeShared = { isAuthenticated, setAuthenticated, login, logout, userName, role ,userFirstName,userLastName}

    async function login(userName, userPassword) {
        try{
            const response=await axios.post('http://localhost:8765/user-service/authenticate', {
            userName,
            userPassword
        })
            if (response.status === 200) {
                    console.log('Setting isAuthenticated to true')
                    setAuthenticated(true)
                    setUserName(userName)
                    setRole(response.data.user.role[0].roleName)
                    setUserFirstName(response.data.user.userFirstName)
                    setUserLastName(response.data.user.userLastName)
                    return true
                } else {
                    throw new Error("Invalid username or password")
                }
            } catch(error) {
                console.error(error)
                return Promise.reject(error)

            }
            

        // try {
        //     axios.post('http://localhost:8765/user-service/authenticate', {
        //       userName,
        //       userPassword,
        //     });
        //     if (response.status === 200) {
        //       // The username and password are correct
        //         setAuthenticated(true)
        //         setUserName(userName)
        //         setRole(response.data.user.role[0].roleName)

        //         return true
        //     } 
        //     else {
        //         setAuthenticated(false)
        //         setUserName(null)
        //         return false
        //       // The username and password are incorrect
        //     }
        //   } catch (error) {
        //     // There was an error making the request (e.g. network error)
        //   }
    }

    function logout() {
        setAuthenticated(false)
    }

    // function goToList(){
    //     navigate(`/welcome/${AuthContext.userName}`)
    // }

    return (
        <AuthContext.Provider value={valueToBeShared}>
            {children}
        </AuthContext.Provider>

    )
}