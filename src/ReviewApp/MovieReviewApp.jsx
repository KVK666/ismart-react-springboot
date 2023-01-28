import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider, { useAuth } from "../security/AuthContext";
import HeaderComponent from "./HeaderComponent";
import WelcomeComponent from "./WelcomeComponent";
import MovieComponent from "./MovieComponent";
import ReviewComponent from "./ReviewComponent";
import ReviewsUnderMovieComponent from "./ReviewsUnderMovieComponent";
import MovieListComponent from "./MovieListComponent";
import LogoutComponent from "./LogoutComponent";
import ErrorComponent from "./ErrorComponent";

export default function MovieReviewApp() {


    function AuthenticatedRoute({ children }) {
        const authContext = useAuth()

        if (authContext.isAuthenticated)
            return children

        return <Navigate to='/' />

    }
    return (
        <div className="MovieReviewApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/register' element={<RegisterComponent />} />
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                                </AuthenticatedRoute>
                            } />
                        <Route path='/movies/:id' element={
                            <AuthenticatedRoute>
                                <MovieComponent />
                            </AuthenticatedRoute>} />
                        <Route path='/movies/:username/reviews/:id' element={
                            <AuthenticatedRoute>
                                <ReviewComponent />
                            </AuthenticatedRoute>
                        }>
                        </Route>
                        <Route path='/movies' element={
                            <AuthenticatedRoute>
                                <MovieListComponent />
                            </AuthenticatedRoute>
                        }>
                        </Route>
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        }>
                        </Route>
                        <Route path='*' element={<ErrorComponent />}></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}