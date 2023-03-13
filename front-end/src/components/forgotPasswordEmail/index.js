/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A ForgotPassword component which helps to reset user password.
 */

import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Logo from "../../Resources/housify-logo.png";
import axios from "axios";

function ForgotPasswordEmail() {
  const navigate = useNavigate();

  const emailRegex = /^[0-9a-zA-Z._-]+@[0-9a-zA-Z._-]+\.[(0-9a-zA-Z._)]+$/;

  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    email: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(data.email)) {
      setErrorMessage("Please provide valid email address");
    } else {
      setErrorMessage("");
      try {
        const url =
          "https://group12-backend.herokuapp.com/forgetPasswordAuthenticate";
        const res = await axios.post(url, data);
        if (res.status === 200 && res.data.success) {
          navigate("/check-mail");
        } else {
          throw new Error(res.data.message);
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
          <h3>Reset Password</h3>
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
          {errorMessage.length > 0 ? (
            <p className="button-center" style={{ color: "red" }}>
              {errorMessage}
            </p>
          ) : null}
          <div className="button-center">
            <Button variant="primary" type="submit">
              Send Verification
            </Button>
          </div>
          <div>
            <hr className="simple-line" />
          </div>
          <div className="button-center forgot-password text-right">
            <p className="forgot-password text-right">
              Wants to Login ? <NavLink to="/sign-in">log in</NavLink>
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ForgotPasswordEmail;
