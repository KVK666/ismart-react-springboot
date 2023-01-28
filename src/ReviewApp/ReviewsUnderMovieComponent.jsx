import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { retrieveAllReviewsOfMovieApi } from "../api/MovieReviewApiService"
import LoadingSpinner from "./LoadingSpinner"

export default function ReviewsUnderMovieComponent(){

    const {id} =useParams()

    
    const [reviews,setReviews]=useState([])





    useEffect(
        () => {
            
            refreshReviews()}, []
    )

    function refreshReviews(){
        retrieveAllReviewsOfMovieApi(id)
        .then(response => {
            setReviews(response.data)
            refreshReviews()
            
        })
        .catch(error => console.log(error))
    }






    return(
        <div style={{margin: "25px",textAlign:"left"}}>
            <h4 style={{textAlign:"center"}}>Reviews</h4>
            
            <div style={{textAlign:"center"}}>
            {reviews.length===0 && <p>Be the first one to review this movie</p>}
            </div>
            
            <ol >
            {reviews.map(review =>(
                <li key={review.id} className="card mb-3">
                    <p><img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user" width="50px" height="50px"/>{review.userName}</p>
                    <p>Overall Rating: {review.rating} stars</p>
                    <p>Review: {review.review}</p>
                </li>
            ))}
            </ol>
        </div>

    )
}