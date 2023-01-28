import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createMovieApi, retrieveMovieByIdApi, updateMovieApi } from "../api/MovieReviewApiService"


export default function MovieComponent() {

    const {id}=useParams()

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [description, setDescription] = useState('')
    const [director, setDirector] = useState('')
    const [language, setLanguage] = useState('')
    const [overAllRating, setRating] = useState('')

    const navigate = useNavigate()

    useEffect(
        () => retrieveMovies(), []
    )

    function retrieveMovies() {
        if (id !== -1) {
            retrieveMovieByIdApi(id)
                .then(response => {
                    setTitle(response.data.title)
                    setYear(response.data.year)
                    setDescription(response.data.description)
                    setDirector(response.data.director)
                    setLanguage(response.data.language)
                    setRating(response.data.overAllRating)
                })
                .catch(error => console.log(error))
        }

    }

    function onSubmit(values) {
        console.log(values)
        const movie = {
            id: id,
            title: values.title,
            year: values.year,
            description: values.description,
            director: values.director,
            language: values.language,
            overAllRating: values.overAllRating


        }
        console.log(movie)
        if (id == -1) {
            createMovieApi(movie)
                .then(response => {
                    navigate('/movies')
                })
                .catch(error => console.log(error))
        } else {
            updateMovieApi(id, movie)
                .then(response => {
                    navigate('/movies')
                })
                .catch(error => console.log(error))
        }
    }


    function validate(values) {
        let errors = {
            // year:"Enter a valid year",
            // description:"Enter a valid description"
        }
        if (values.description.length < 5) {
            errors.description = "Enter atleast 5 characters"
        }



        if (values.title.length === null || values.title === '') {
            errors.title = "Enter the movie name"
        }

        if (values.director.length === null || values.director === '') {
            errors.director = "Enter the name of the director"
        }

        if (values.language.length == null || values.langauge === '') {
            errors.language = "Enter the language"
        }


        console.log(values)
        return errors

    }

    return (
        <div className="container">
            <h1>Enter Movie Details</h1>
            <div>
                <Formik initialValues={{ title, year, description, director, language, overAllRating }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}

                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage
                                    name="year"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage
                                    name="director"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <ErrorMessage
                                    name="language"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <ErrorMessage
                                    name="overAllRating"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <fieldset className="form-group ">
                                    <label>Movie Name</label>
                                    <Field className="form-control" name="title" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Released Year</label>
                                    <Field className="form-control" name="year" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Director</label>
                                    <Field className="form-control" name="director" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Language</label>
                                    <Field className="form-control" name="language" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Rating</label>
                                    <Field className="form-control" name="overAllRating" />
                                </fieldset>

                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>

                            </Form>

                        )
                    }

                </Formik>

            </div>
        </div>
    )
}