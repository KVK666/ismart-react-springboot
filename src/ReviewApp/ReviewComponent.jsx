import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteReviewByIdApi, postReviewApi, retrieveAllReviewsOfMovieApi, retrieveMovieByIdApi } from '../api/MovieReviewApiService';
import { useEffect } from 'react';
import "./MovieReviewApp.css"

import StarRatingComponent from 'react-star-rating-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext, useAuth } from '../security/AuthContext';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default function ReviewComponent() {

    const authContext = useAuth()

    const { id } = useParams();

    const { username } = useParams()

    const [reviews, setReviews] = useState([])

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [description, setDescription] = useState('')
    const [director, setDirector] = useState('')
    const [language, setLanguage] = useState('')
    const [overAllRating, setRating] = useState('')
    const [poster, setPoster] = useState('')
    const [backPoster, setBackPoster] = useState('')

    const [userReview, setUserReview] = useState('')
    const [movieRating, setMovieRating] = useState('')
    const [modal, setModal] = useState(false);

    useEffect(
        () => retrieveMovies(), [id]
    )

    function retrieveMovies() {
        retrieveMovieByIdApi(id)
            .then(response => {
                setTitle(response.data.title)
                setYear(response.data.year)
                setDescription(response.data.description)
                setDirector(response.data.director)
                setLanguage(response.data.language)
                setRating(response.data.overAllRating)
                setPoster(response.data.poster)
                setBackPoster(response.data.backPoster)
            })
            .catch(error => console.log(error))




    }


    useEffect(
        () => {

            refreshReviews()
        }, []
    )

    function refreshReviews() {
        retrieveAllReviewsOfMovieApi(id)
            .then(response => {

                setReviews(response.data)
                refreshReviews()


            })
            .catch(error => console.log(error))
    }




    const movie = {
        id: id,
        title: title,
        year: year,
        description: description,
        director: director,
        language: language,
        overAllRating: overAllRating,
        poster: poster,
        backPoster: backPoster
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const review = {
            username: username,
            rating: movieRating,
            review: userReview
        }
        postReviewApi(id, username, review)
            .then(response => {
                console.log(response)
                refreshReviews()
                setUserReview('');
                setMovieRating('');
                setModal(false);
            })
            .catch(error => console.log(error));
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = Math.round(totalRating / reviews.length);


    function handleDelete(reviewId) {
        deleteReviewByIdApi(reviewId)
            .then(refreshReviews())
            .catch(error => console.log(error))
    }



    return (
        <div >
            <div className="movie">
                <div className="movie__intro">
                    <img className="movie__backdrop" src={movie.backPoster} alt={movie.title} />
                </div>
                <div className="movie__detail">
                    <div className="movie__detailLeft">
                        <div className="movie__posterBox">
                            <img className="movie__poster" src={movie.poster} alt={movie.title} />
                        </div>
                    </div>
                    <div className="movie__detailRight">
                        <div className="movie__detailRightTop">
                            <div className="movie__name">{movie.title}</div>
                            <div className="movie__rating">
                                {averageRating} <i class="fas fa-star" />
                            </div>
                            <div className="movie__releaseDate">{movie ? "Released Year: " + movie.year : ""}</div>
                        </div>
                        <div className="movie__detailRightBottom">
                            <div className="synopsisText">Description</div>
                            <div>{movie ? movie.description : ""}</div>
                        </div>

                    </div>
                </div>
            
                <Button className='write-review-button' color="primary" onClick={() => setModal(true)}>Write a Review</Button>
                <Modal isOpen={modal} toggle={() => setModal(false)}>
                    <ModalHeader toggle={() => setModal(false)}>Write a Review</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <div class="form-group">
                                <textarea
                                    class="form-control"
                                    id="reviewText"
                                    placeholder="Write your review here"
                                    value={userReview}
                                    onChange={event => setUserReview(event.target.value)}
                                />
                                
                            </div>
                            <div class="form-group">
                                <label for="ratingSelect">Select a rating:</label>
                                <select
                                    class="form-control"
                                    id="ratingSelect"
                                    value={movieRating}
                                    onChange={event => setMovieRating(event.target.value)}
                                >
                                    <option value="">Select a rating</option>
                                    <option value="1">1 star</option>
                                    <option value="2">2 stars</option>
                                    <option value="3">3 stars</option>
                                    <option value="4">4 stars</option>
                                    <option value="5">5 stars</option>
                                </select>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>Submit Review</Button>{' '}
                        <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            



            <div style={{ margin: "25px", textAlign: "left" }}>
                <h4 style={{ textAlign: "center" }}>Reviews</h4>

                <div style={{ textAlign: "center" }}>
                    {reviews.length === 0 && <p>Be the first one to review this movie</p>}
                </div>



                <div class="review-grid">
                    {reviews.map(review => (
                        <div class="review-card" key={review.id}>
                            <div class="review-header">
                                <FontAwesomeIcon icon={faUser} style={{ width: '30px', height: '30px', borderRadius: "50%" }} size="2x" color="#000" />
                                <h5 class="review-username">{review.userName}</h5>
                                {authContext.role === "Admin" || review.userName === authContext.userName ? (
                                    <FontAwesomeIcon icon={faTrash} class="review-delete" onClick={() => handleDelete(review.id)} />
                                ) : null}
                            </div>
                            <div class="review-body">
                                <span class="review-rating">
                                    <StarRatingComponent
                                        name="rating"
                                        value={review.rating}
                                        starCount={5}
                                        editing={false}
                                    />
                                </span>
                                <p class="review-text">Review: {review.review}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>





        </div>


    )
} 