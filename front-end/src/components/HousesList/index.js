import React, { useState, useEffect } from "react";
import HouseDataService from "../../services/HouseService";
import {  Container, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const HousesList = () => {
    const navigate = useNavigate();
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        retrieveHouses();
    }, []);

    const retrieveHouses = () => {
        HouseDataService.getAll(localStorage.email)
            .then(response => {
                setHouses(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    const handleClick = (id) => {
        navigate(`/house/${id}`);
    }


    return (
        <Container className="mt-4">
            <Row>
                <div className="col-lg-12 float-end">
                    <h2 className="text-secondary Helvetica">House Listings</h2>
                </div>

            </Row>
            <Row className="my-1">
                <div className="col-lg-12">
                    <Button className="float-end" variant="success" onClick={() => navigate("/add-house")}>Add New</Button>
                </div>
            </Row>
            <Row>
                {houses &&
                    houses.map(house => (

                        <div className="col-lg-3">

                            <Card style={{ width: '18rem', marginTop: "25px" }} border="primary" className="p-2">
                                <Card.Img variant="top" src={house.selectedFile} onClick={() => handleClick(house._id)} style={{ width: "auto", height: "175px" }} />
                                <Card.Body>
                                    <Card.Title>{house.title}</Card.Title>
                                    <Card.Text>
                                        {house.description}
                                    </Card.Text>

                                    <Button onClick={() => navigate("/house/" + house._id + "/edit")} className="pull-left mr-3" variant="primary">Edit</Button>
                                    <Button onClick={() => navigate("/house/" + house._id + "/delete")} className="float-end" variant="danger">Delete</Button>
                                </Card.Body>
                            </Card>

                        </div>
                    ))}

            </Row>
        </Container>
    );
};
export default HousesList;