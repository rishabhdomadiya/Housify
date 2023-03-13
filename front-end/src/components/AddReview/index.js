import React, { useEffect, useState } from "react";
import HouseDataService from "../../services/HouseService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

var options = require("../../config/constants.js");

const AddReview = () => {
    const initialHouseState = {
        id: null,
        title: "",
        description: "",
        street: "",
        city: "",
        province: "",
        category: "house",
    };

    const initialReview = {
        rating:"1",
        feedback:""
    };

    const [house, setHouse] = useState(initialHouseState);
    const [review, setReview] = useState(initialReview);
    const params = useParams();
    const navigate = useNavigate();

    const [errors, SetErrors] = useState({});

    const handleInputChange = event => {
        const { name, value } = event.target;
        setReview({ ...review, [name]: value });
    };

    const getHouse = async id => {
        console.log("inside get");
        var house = await HouseDataService.get(id)
        return house;
    };

    useEffect(() => {

        getHouse(params.id).then(response => {
            setHouse({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                selectedFile: response.data.selectedFile,
                street: response.data.address.street,
                city: response.data.address.city,
                people: response.data.people_count,
                province: response.data.address.province,
            });
        });
    }, [params.id]);

    const handleValidation = () => {
        let formIsValid = true;

        var local = {};

        if (!review.feedback) {
            formIsValid = false;
            local = { ...local, feedback: "Feedback cannot be empty." }
        }

        SetErrors(local);
        return formIsValid;
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!handleValidation()) {
            alert("errors");
            console.log(errors);
        }
        else {
            var data = {
                rating: review.rating,
                feedback: review.feedback,
                house_id: params.id,
                email: localStorage.email
            };
            HouseDataService.addReview(data)
                .then(response => {
                    setReview({
                        id: response.data.id,
                        rating: response.data.rating,
                        feedback: response.data.feedback,
                        house_id: response.data.house_id,
                    });
                    navigate("/reviews");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    return (
        <div className="container mt-4">
            <Row>
                <h2 style={{ fontFamily: "apple-system" }}><strong>Add House Review</strong></h2>
            </Row>
            <Form onSubmit={handleSubmit}>
                <div className="form ml-4 mt-3 mb-4 mr-4 p-3 border border-primary">

                    <div className="row">

                        <div className="col-lg-12">
                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    readOnly
                                    value={house.title}
                                    name="title"
                                />
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={house.description}
                                    readOnly
                                    name="description"
                                />
                            </div>



                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="street">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="street"
                                    required
                                    value={house.street + "," + house.city + "," + house.province}
                                    readOnly
                                    name="street"
                                />
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="image">Image</label>
                                <div>
                                    <img style={{ width: "25%" }} src={house.selectedFile}></img>
                                </div>
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="category">Select Rating</label>
                                {console.log(house)}
                                <select name="rating" id="rating" value={house.category} className="form-control" onChange={handleInputChange}>
                                    {options.rating.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="street">Feedback</label>
                                <textarea
                                    className="form-control"
                                    id="feedback"
                                    required
                                    onChange={handleInputChange}
                                    name="feedback"
                                />
                                <span style={{ color: "red" }}>{errors["feedback"]}</span>
                            </div>
                            <Button className="float-end m-3 px-3" onClick={handleSubmit} variant="success" >Submit</Button>

                        </div>
                    </div>
                </div>
            </Form>
        </div >
    );
}

export default AddReview;