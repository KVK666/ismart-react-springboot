
import { Link } from "react-router-dom"
import { useAuth } from "../security/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";




function HeaderComponent() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;

    function logout() {
        authContext.logout()
    }




    return (
        <header className="border-bottom border-light border-5 mb-5 p-2 ">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg ">
                        {/* navbar-blue bg-light text-dark fixed-top */}
                        <a
                            className="navbar-brand ms-2 fs-2 fw-bold text-black"
                            href="https://www.twitter.com/vamsi_kvk_"
                        >
                            iSmart
                        </a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    {isAuthenticated && (
                                        <Link
                                            className="nav-link"
                                            to={`/welcome/${authContext.userName}`}
                                        >
                                            Home
                                        </Link>
                                    )}
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated && (
                                        <Link className="nav-link" to="/movies">
                                            Movies
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            {!isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Signup
                                        </Link>
                                    </li>
                                </>
                            )}
                            {isAuthenticated && (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="me-2"
                                            size="lg"
                                        />
                                    </a>
                                    <ul
                                        className={`dropdown-menu ${dropdownOpen && "show"}`}
                                        aria-labelledby="navbarDropdownMenuLink"
                                    >
                                        <li>
                                            <Link className="dropdown-item" to="#">
                                                My profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/logout"
                                                onClick={logout}
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent