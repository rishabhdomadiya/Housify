/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A user profile, having basic information of the user
 */

import React from "react";
import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import ProfileImage from "../../Resources/user-avatar02.png";
import axios from "axios";

const mobileNumberRegex = /^[0-9]{10}$/;
const nameRegex = /^[A-Za-z]+$/;

function UserProfile() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: localStorage.getItem("email"),
    contactNumber: "",
    currentCity: "Halifax",
    preferredCity: "Halifax",
    country: "Canada",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(async () => {
    try {
      const url = "https://group12-backend.herokuapp.com/getOneUserDetails";
      const res = await axios.post(url, {
        email: localStorage.getItem("email"),
      });
      console.log(res);
      if (res.status === 200) {
        setData((prev) => ({
          ...prev,
          contactNumber: res.data.users.contactNumber,
          currentCity: res.data.users.currentCity,
          preferredCity: res.data.users.preferredCity,
          country: res.data.users.country,
        }));
        setFirstName(res.data.users.firstName);
        setLastName(res.data.users.lastName);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSignOut = () => {
    // navigate("/sign-in", { replace: true });
  };

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobileNumberRegex.test(data.contactNumber)) {
      setErrorMessage("Only 10 digit number allowed");
    } else if (!nameRegex.test(data.currentCity)) {
      setErrorMessage("Invalid current city name - Only alphabets allowed");
    } else if (!nameRegex.test(data.preferredCity)) {
      setErrorMessage("Invalid preferred city name - Only alphabets allowed");
    } else if (!nameRegex.test(data.country)) {
      setErrorMessage("Invalid country name - Only alphabets allowed");
    } else {
      setErrorMessage("");
      try {
        const url = "https://group12-backend.herokuapp.com/updateUserProfile";
        const res = await axios.post(url, data);
        console.log(res);
        console.log(res.message);
        if (res.status === 200) {
          setSuccessMessage(
            "Your profile details has been updated successfully."
          );
        }
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <div className="outer">
        <div className="inner">
          <Row>
            <Col>
              <div className="button-center">
                <img
                  src={ProfileImage}
                  height={100}
                  width={100}
                  alt="User Profile Image"
                />
              </div>
              <br />
              <div>
                <h3 className="profile-name-font">
                  {firstName} {lastName}
                </h3>
              </div>
              <br />
              <div className="button-center">
                <h6 className="profile-name-font tag-line-font">
                  Way to your dream house
                </h6>
              </div>
              {successMessage && (
                <Alert variant="success" className="mb-0">
                  {successMessage}
                </Alert>
              )}
              <br />
              <div className="button-center form-group">
                <input
                  type="text"
                  className="form-control inside-textbox form-field-color"
                  placeholder="Add Contact Number"
                  name="contactNumber"
                  value={data.contactNumber}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control inside-textbox form-field-color"
                  placeholder="Your Current City"
                  name="currentCity"
                  value={data.currentCity}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control inside-textbox form-field-color"
                  placeholder="Add Preffered City"
                  name="preferredCity"
                  value={data.preferredCity}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control inside-textbox form-field-color"
                  placeholder="Canada"
                  name="country"
                  value={data.country}
                  onChange={handleChange}
                />
              </div>
              <br />
              {errorMessage.length > 0 ? (
                <p className="button-center" style={{ color: "red" }}>
                  {errorMessage}
                </p>
              ) : null}
              <br />
              <Row>
                <Col>
                  <div className="button-center">
                    <LinkContainer to="/saved-searches">
                      <Button variant="primary">Saved Searches</Button>
                    </LinkContainer>
                  </div>
                </Col>
                <Col>
                  <div className="button-center">
                    <Button variant="success" onClick={handleSubmit}>
                      Save Changes
                    </Button>
                  </div>
                </Col>
              </Row>
              <br />
              <div>
                <hr className="simple-line" />
              </div>
              <br />
              <Row>
                <Col>
                  <div className="button-center">
                    <Button variant="danger" onClick={handleSignOut}>
                      Sign out
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default UserProfile;
