import React, { useState, useEffect } from "react";
import HouseDataService from "../../services/HouseService.js";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import { Col, Container, Row, Card, Button } from "react-bootstrap";

const HouseDetail = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const emailAddress = state?.email;

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
  const [currentHouse, setCurrentHouse] = useState(initialHouseState);
  const getHouse = async (id) => {
    var house = await HouseDataService.get(id);
    return house;
  };

  useEffect(() => {
    getHouse(params.id).then((response) => {
      setCurrentHouse({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        selectedFile: response.data.selectedFile,
        street: response.data.address.street,
        city: response.data.address.city,
        people: response.data.people_count,
        province: response.data.address.province,
        category: response.data.category,
        rooms: response.data.rooms,
        bathrooms: response.data.bathrooms,
        price: response.data.price,
        email: response.data.email,
        phone: response.data.phone,
      });
    });
  }, [params.id]);

  return (
    <Container className="mt-4 w-75">
      <div className="edit-form">
        <Row>
          <h2 style={{ fontFamily: "apple-system" }}>
            <strong>House Detail</strong>
          </h2>
        </Row>
        <div className="edit-form ml-4 mt-3 mb-4 mr-4 p-3 border border-primary">
          <Row>
            <div class="col-lg-6">
              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="title">
                  <strong>Title</strong>
                </label>
                <p>{currentHouse.title}</p>
              </div>

              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="image">
                  <strong>Image</strong>
                </label>
                <div>
                  <img
                    style={{ width: "500px", height: "auto" }}
                    src={currentHouse.selectedFile}
                  ></img>
                </div>
              </div>

              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="description">
                  <strong>Description</strong>
                </label>
                <p>{currentHouse.description}</p>
              </div>

              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="address">
                  <strong>Address</strong>
                </label>
                <p>
                  {currentHouse.street},{currentHouse.city},
                  {currentHouse.province}
                </p>
              </div>
            </div>
            <div class="col-lg-6">
              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="category">
                  <strong>Category</strong>
                </label>
                <p>{currentHouse.category.toUpperCase()}</p>
              </div>

              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="rooms">
                  <strong>Rooms</strong>
                </label>
                <p>{currentHouse.rooms}</p>
              </div>

              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="people">
                  <strong>Numer of Persons</strong>
                </label>
                <p>{currentHouse.people}</p>
              </div>

              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="bathrooms">
                  <strong>Bathrooms</strong>
                </label>
                <p>{currentHouse.bathrooms}</p>
              </div>

              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="price">
                  <strong>Price</strong>
                </label>
                <p>{currentHouse.price} CAD</p>
              </div>

              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="email">
                  <strong>Email</strong>
                </label>
                <p>{currentHouse.email}</p>
              </div>

              <div className="form-group m-1 p-1">
                <label className="mb-1" htmlFor="phone">
                  <strong>Phone</strong>
                </label>
                <p>{currentHouse.phone}</p>
              </div>

              <div>
                {currentHouse.email != localStorage.email ? (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() =>
                      navigate("/RentalForm/" + params.id, {
                        state: { emailAddress },
                      })
                    }
                    className="btn btn-secondary btn-block btn-round"
                  >
                    Apply Now
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Row>
        </div>
      </div>
    </Container>
  );
};
export default HouseDetail;
