/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A user profile, having basic information of the user
 */

import React from "react";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Logo from "../../Resources/CreditCard.png";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LinkContainer } from "react-router-bootstrap";

function Payment() {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const amountRegex = /[0-9]/;
  const cardNumberRegex = /^[0-9]{12}$/;
  const nameRegex = /^[A-Za-z]+$/;
  const monthRegex = /^[0-9]{2}$/;
  const yearRegex = /^[0-9]{4}$/;
  const cvvRegex = /^[0-9]{3}$/;

  const [data, setData] = useState({
    email: localStorage.getItem("email"),
    amount: "",
    cardNumber: "",
    cardHolderName: "",
    month: "",
    year: "",
    cvv: "",
  });

  const [dataToSend, setDataToSend] = useState({
    amount: "",
    date: "",
    month: "",
    year: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amountRegex.test(data.amount)) {
      setErrorMessage("Amount must be a number");
    } else if (!cardNumberRegex.test(data.cardNumber)) {
      setErrorMessage("Card number must be 12 dogits");
    } else if (!nameRegex.test(data.cardHolderName)) {
      setErrorMessage("Invalid name - only alphabets allowed");
    } else if (!monthRegex.test(data.month)) {
      setErrorMessage("Invalid Month");
    } else if (!yearRegex.test(data.year)) {
      setErrorMessage("Invalid Year");
    } else if (!cvvRegex.test(data.cvv)) {
      setErrorMessage("Invalid CVV");
    } else {
      dataToSend.amount = data.amount;
      dataToSend.date = new Date().getDate();
      dataToSend.month = new Date().getMonth() + 1;
      dataToSend.year = new Date().getUTCFullYear();
      setErrorMessage("");

      try {
        const url = "https://group12-backend.herokuapp.com//savePayment";
        const res = await axios.post(url, {
          paymentDetails: dataToSend,
          email: localStorage.getItem("email"),
        });
        console.log("res", res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="outer outer-padding">
        <div className="inner flexible-saved-search-houses center-card">
          <Row>
            <h3 className="profile-name-font payment-font-left">
              Rental Payment
            </h3>
          </Row>
          <Row>
            <Col>
              <div className="image-div-margin">
                <img
                  src={Logo}
                  height={250}
                  width={400}
                  alt="Housify Logo"
                  className="button-center"
                />
              </div>
            </Col>
            <Col className="center-all-items">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control inside-textbox form-field-color"
                  placeholder="Amount"
                  name="amount"
                  value={data.amount}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control inside-textbox form-field-color"
                  placeholder="CARD NUMBER"
                  name="cardNumber"
                  value={data.cardNumber}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control inside-textbox form-field-color"
                  placeholder="CARD HOLDER NAME"
                  name="cardHolderName"
                  value={data.cardHolderName}
                  onChange={handleChange}
                />
              </div>
              <br />
              <Row>
                <Col>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control inside-textbox form-field-color"
                      placeholder="MM"
                      name="month"
                      value={data.month}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                </Col>
                <Col>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control inside-textbox form-field-color"
                      placeholder="YYYY"
                      name="year"
                      value={data.year}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                </Col>
                <Col>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control inside-textbox form-field-color"
                      placeholder="CVV"
                      name="cvv"
                      value={data.cvv}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                </Col>
              </Row>
              <Row>
                {errorMessage.length > 0 ? (
                  <p className="button-center" style={{ color: "red" }}>
                    {errorMessage}
                  </p>
                ) : null}
              </Row>
              <Row>
                <Col>
                  <div className="button-center">
                    <Button variant="primary" onClick={handleSubmit}>
                      Pay now
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="button-center">
                    <LinkContainer to="/ViewApplicationStatus">
                      <Button variant="danger">Cancel</Button>
                    </LinkContainer>
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
  );
}

export default Payment;
