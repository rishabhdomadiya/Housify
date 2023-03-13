import React from 'react';
import HouseDataService from "../../services/HouseService";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { BsPlusLg, BsPencilSquare } from "react-icons/bs";


const Reviews = () => {
    const navigate = useNavigate();
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        retrieveHousesLived();
    }, []);

    const retrieveHousesLived = () => {
        HouseDataService.getUserLivedHouses(localStorage.email)
            .then(response => {
                setHouses(response.data);
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
                    <h2 className="text-secondary Helvetica">Previously Lived-In Houses</h2>
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

                                    <h5>Review</h5>
                                    <Button onClick={() => navigate("/house/" + house._id + "/add-review")} className="pull-left mr-3" variant="primary"><BsPlusLg /></Button>
                                    <Button onClick={() => navigate("/house/" + house._id + "/edit-review")} className="float-end" variant="warning"><BsPencilSquare /></Button>
                                </Card.Body>
                            </Card>

                        </div>
                    ))}

            </Row>
        </Container>
    );
};

export default Reviews;