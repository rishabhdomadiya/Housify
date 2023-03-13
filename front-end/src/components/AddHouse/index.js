import React, { useEffect, useState } from "react";
import HouseDataService from "../../services/HouseService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Button } from "react-bootstrap";
import { PickerOverlay } from 'filestack-react';
import { useNavigate } from "react-router-dom";

var options = require("../../config/constants.js");


const apikey = 'A39idLbeQdidVjG0ZQjZqz';

const AddHouse = () => {
    const initialHouseState = {
        id: null,
        title: "",
        description: "",
        street: "",
        city: "",
        province: "",
        category: "house",
        people: "",
        rooms: "1",
        bathrooms: "",
        price: "",
        email: "",
        phone: "",
        selectedFile: "",
        isFilePicked: false,
    };
    const navigate = useNavigate();
    const [house, setHouse] = useState(initialHouseState);
    const [selectedFile, setSelectedFile] = useState();
    const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);
    const [errors, SetErrors] = useState({});

    const handleInputChange = event => {
        const { name, value } = event.target;
        setHouse({ ...house, [name]: value });
    };

    
    const handleValidation = () => {
        let formIsValid = true;

        var local = {};

        if (!house.title) {
            formIsValid = false;
            local = { ...local, title: "Title cannot be empty." }
        }

        if (!house.description) {
            formIsValid = false;

            local = { ...local, description: "Description cannot be empty." }
        }

        if (!house.street) {
            formIsValid = false;
            local = { ...local, street: "Street cannot be empty." }
        }

        if (!house.city) {
            formIsValid = false;
            local = { ...local, city: "City cannot be empty." }
        }

        if (!house.province) {
            formIsValid = false;
            local = { ...local, province: "Province cannot be empty." }
        }

        if (!house.people) {
            formIsValid = false;
            local = { ...local, people: "People cannot be empty." };
        }

        if (!house.bathrooms) {
            formIsValid = false;
            local = { ...local, bathrooms: "Bathrooms cannot be empty." }
        }

        if (!house.price) {
            formIsValid = false;
            local = { ...local, price: "Price cannot be empty." }
        }

        if (house.price && !/^\d+$/.test(house.price)) {
            formIsValid = false;
            local = { ...local, price: "Please provide a numeric price." }
        }

        if (!house.email) {
            formIsValid = false;
            local = { ...local, email: "Email cannot be empty." }
        }

        if (house.email && !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(house.email)) {
            formIsValid = false;
            local = { ...local, email: "Please provide a correct email." }
        }

        if (!house.phone) {
            formIsValid = false;
            local = { ...local, phone: "Phone cannot be empty." }
        }

        if (house.phone && !/^\d+$/.test(house.phone)) {
            formIsValid = false;
            local = { ...local, phone: "Please provide a correct phone number with digits only." }
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
                title: house.title,
                description: house.description,
                selectedFile: selectedFile,
                street: house.street,
                city: house.city,
                province: house.province,
                category: house.category,
                people: house.people,
                rooms: house.rooms,
                bathrooms: house.bathrooms,
                price: house.price,
                email: house.email,
                phone: house.phone
            };
            HouseDataService.create(data)
                .then(response => {
                    setHouse({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        selectedFile: response.data.selectedFile,
                        people: response.data.selectedFile,
                        street: response.data.street,
                        city: response.data.city,
                        province: response.data.province,
                        category: response.data.category,
                        rooms: response.data.rooms,
                        bathrooms: response.data.bathrooms,
                        price: response.data.price,
                        email: response.data.email,
                        phone: response.data.phone,
                    });
                    navigate("/houses")
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    return (
        <div className="container mt-4">
            <Row>
                <h2 style={{ fontFamily: "apple-system" }}><strong>Add House</strong></h2>
            </Row>
            <Form onSubmit={handleSubmit}>
                <div className="form ml-4 mt-3 mb-4 mr-4 p-3 border border-primary">

                    <div className="row">

                        <div className="col-lg-6">
                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={house.title}
                                    onChange={handleInputChange}
                                    name="title"
                                />

                                <span style={{ color: "red" }}>{errors["title"]}</span>
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={house.description}
                                    onChange={handleInputChange}
                                    name="description"
                                />
                                <span style={{ color: "red" }}>{errors["description"]}</span>
                            </div>


                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="image-file">Upload Image</label>
                                <div>
                                    <button className="btn-primary"
                                        onClick={() =>
                                            isPickerOverlayVisible
                                                ? setIsPickerOverlayVisible(false)
                                                : setIsPickerOverlayVisible(true)
                                        }
                                    >
                                        Choose File
                                    </button>
                                    {isPickerOverlayVisible && <PickerOverlay apikey='A39idLbeQdidVjG0ZQjZqz' onSuccess={(res) => "first" + console.log(res)}
                                        onUploadDone={(res) => {
                                            console.log((res.filesUploaded)[0].url);
                                            var image_url = (res.filesUploaded)[0].url;
                                            setSelectedFile(image_url);
                                            setIsPickerOverlayVisible(false);
                                        }
                                        } />}

                                </div>
                            </div>
                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="street">Street</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="street"
                                    required
                                    value={house.street}
                                    onChange={handleInputChange}
                                    name="street"
                                />
                                <span style={{ color: "red" }}>{errors["street"]}</span>
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="city">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    required
                                    value={house.city}
                                    onChange={handleInputChange}
                                    name="city"
                                />
                                <span style={{ color: "red" }}>{errors["city"]}</span>
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="province">Province</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="province"
                                    required
                                    value={house.province}
                                    onChange={handleInputChange}
                                    name="province"
                                />
                                <span style={{ color: "red" }}>{errors["province"]}</span>
                            </div>

                        </div>
                        <div class="col-lg-6">

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="category">Category</label>
                                {console.log(house)}
                                <select name="category" id="category" value={house.category} className="form-control" onChange={handleInputChange}>
                                    {options.house_categories_options.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>


                            <div className="form-group m-3 p-1">
                                <label className="mb-1">Rooms</label>
                                <select name="rooms" value={house.rooms} className="form-control" onChange={handleInputChange}>
                                    {options.rooms.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>

                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="people">Number of People</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="people"
                                    required
                                    value={house.people}
                                    onChange={handleInputChange}
                                    name="people"
                                />
                                <span style={{ color: "red" }}>{errors["people"]}</span>
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="bathrooms">Bathrooms</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="bathrooms"
                                    required
                                    value={house.bathrooms}
                                    onChange={handleInputChange}
                                    name="bathrooms"
                                />
                                <span style={{ color: "red" }}>{errors["bathrooms"]}</span>
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    required
                                    value={house.price}
                                    onChange={handleInputChange}
                                    name="price"
                                />
                                <span style={{ color: "red" }}>{errors["price"]}</span>
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={house.email}
                                    onChange={handleInputChange}
                                    name="email"
                                />
                                <span style={{ color: "red" }}>{errors["email"]}</span>
                            </div>

                            <div className="form-group m-3 p-1">
                                <label className="mb-1" htmlFor="phone">Phone</label>
                                <input
                                    type="phone"
                                    className="form-control"
                                    id="phone"
                                    required
                                    value={house.phone}
                                    onChange={handleInputChange}
                                    name="phone"
                                />
                                <span style={{ color: "red" }}>{errors["phone"]}</span>
                            </div>

                            <Button className="float-end m-3 px-3" onClick={handleSubmit} variant="success" >Submit</Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div >
    );
}

export default AddHouse;