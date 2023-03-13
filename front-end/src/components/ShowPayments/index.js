/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A SignIn component which renders signin task on homepage
 */

import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Logo from "../../Resources/housify-logo.png";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LinkContainer } from "react-router-bootstrap";

function ShowPayments(props) {
  const navigate = useNavigate();
  useEffect(async () => {
    try {
      const url = "https://group12-backend.herokuapp.com/getOneUserDetails";
      const res = await axios.post(url, {
        email: localStorage.getItem("email"),
      });
      setSavedPayments(res.data.users.payments);
      console.log("savedPayments", savedPayments);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [savedPayments, setSavedPayments] = useState([]);

  return (
    <Form>
      <div className="outer">
        <div className="inner">
          <div className="button-center">
            <img src={Logo} height={100} width={100} alt="Housify Logo" />
          </div>
          <h3 className="profile-name-font">Your Payments</h3>
          <br />
          <div className="form-group">
            <Row>
              <Col>Amount</Col>
              <Col>Date</Col>
              <Col>Month</Col>
              <Col>Year</Col>
            </Row>
            <br />
            {savedPayments.length > 0 ? (
              savedPayments.map((payment) => (
                <div>
                  <Row>
                    <Col>$ {payment.amount}</Col>
                    <Col>{payment.date}</Col>
                    <Col>{payment.month}</Col>
                    <Col>{payment.year}</Col>
                  </Row>
                  <br />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <br />
          <div className="button-center">
            <LinkContainer to="/ViewApplicationStatus">
              <Button variant="danger">Back</Button>
            </LinkContainer>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ShowPayments;
