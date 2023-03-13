/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A SignUp component which renders registration.
 */

import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Logo from "../../Resources/housify-logo.png";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[0-9a-zA-Z._-]+@[0-9a-zA-Z._-]+\.[(0-9a-zA-Z._)]+$/;
  const passwordRegex = /^.{8,}$/;

  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameRegex.test(data.firstName)) {
      setErrorMessage("Invalid first name - Only alphabets allowed");
    } else if (!nameRegex.test(data.lastName)) {
      setErrorMessage("Invalid last name - Only alphabets allowed");
    } else if (!emailRegex.test(data.email)) {
      setErrorMessage("Please provide valid email address");
    } else if (!passwordRegex.test(data.password)) {
      setErrorMessage(
        "Instructions for password: Minimum 8 Characters + One special Character + One Capital"
      );
    } else {
      setErrorMessage("");
      try {
        const url = "https://group12-backend.herokuapp.com/sign-up-user";
        const res = await axios.post(url, data);
        console.log(res);
        console.log("This is inside Try Block");
        console.log(res.message);
        if (res.status === 201) {
          navigate("/sign-in");
        }
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="outer">
        <div className="inner">
          <div className="button-center">
            <img src={Logo} height={100} width={100} alt="Housify Logo" />
          </div>
          <h3>Register</h3>
          <br />
          <div className="form-group">
            <input
              type="text"
              className="form-control inside-textbox form-field-color"
              placeholder="First name"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              className="form-control inside-textbox form-field-color"
              placeholder="Last name"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="email"
              className="form-control inside-textbox form-field-color"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="password"
              className="form-control inside-textbox form-field-color"
              placeholder="Enter password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <br />
          {errorMessage.length > 0 ? (
            <p className="button-center" style={{ color: "red" }}>
              {errorMessage}
            </p>
          ) : null}
          <div className="button-center">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
          <div>
            <hr className="simple-line" />
          </div>
          <div className="button-center forgot-password text-right">
            <p className="forgot-password text-right">
              Already registered ? <NavLink to="/sign-in">log in</NavLink>
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default SignUp;
