/* 
  authorName : Dhruv Oza 
  email : dhruv.oza@dal.ca
*/

import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { Prev } from "react-bootstrap/esm/PageItem";

const ApplicantDetails = () => {
  const { state } = useLocation();
  const [applicant, setApplicant] = useState({
    fullName: "",
    email: "",
    currentaddress: "",
    contactnumber: "",
    status: "",
    postalcode: "",
    noofpeople: "",
    date: "",
    applicantionID: "",
  });

  const {
    fullName,
    email,
    currentaddress,
    contactnumber,
    status,
    postalcode,
    noofpeople,
    date,
    applicantionID,
  } = applicant;

  useEffect(() => {
    setApplicant(state?.app);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    console.log("name", value);
    setApplicant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .put("https://group12-backend.herokuapp.com/applicationdashboardRoute/updatestatus", { applicant })
      .then((res) => {
        console.log(res.data.message);
        alert(" Update successfully");
      })
      .catch((error) => {
        console.log(error.response);
        alert("Values entered wrong!!");
      });
  };


  return (
    <>
      <Container style={{ padding: "20px" }}>
        <h4
          style={{
            color: "#4267b2",

            margin: "10px 0px 10px 0px",
          }}
        >
          Applicant Details
        </h4>
        <Form>
          <Row>
            <Col>
              <br></br>
              <Form.Label>
                <img src="https://img.icons8.com/ios/20/4267b2/name--v1.png" />
                &nbsp;Full Name
              </Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={applicant.fullName}
                autoComplete="none"
                className="input-applicant"
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <br></br>
              <Form.Label>
                <img src="https://img.icons8.com/external-nawicon-detailed-outline-nawicon/20/4267b2/external-email-communication-nawicon-detailed-outline-nawicon-2.png" />
                &nbsp;Email address
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={applicant.email}
                autoComplete="none"
                className="input-applicant"
                disabled
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <br></br>
              <Form.Label>
                <img src="https://img.icons8.com/material-outlined/20/4267b2/address.png" />
                &nbsp;Address
              </Form.Label>
              <Form.Control
                type="text"
                name="currentaddress"
                value={applicant.currentaddress}
                autoComplete="none"
                className="input-applicant"
                disabled
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <br></br>
              <Form.Label>
                <img src="https://img.icons8.com/material-outlined/20/4267b2/postcode.png" />
                &nbsp;Postal Code
              </Form.Label>
              <Form.Control
                type="text"
                name="postalcode"
                value={applicant.postalcode}
                autoComplete="none"
                className="input-applicant"
                disabled
              />
            </Col>
            <Col>
              <br></br>
              <Form.Label>
                <img src="https://img.icons8.com/ios/20/4267b2/apple-phone.png" />
                &nbsp;Contact Number
              </Form.Label>
              <Form.Control
                type="text"
                name="contactnumber"
                value={applicant.contactnumber}
                autoComplete="none"
                className="input-applicant"
                disabled
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <br></br>
              <Form.Label>
                <img src="https://img.icons8.com/external-victoruler-solid-victoruler/20/4267b2/external-person-logistics-victoruler-solid-victoruler.png" />
                &nbsp;Number of People to move in
              </Form.Label>
              <Form.Control
                type="text"
                name="noofpeople"
                value={applicant.noofpeople}
                autoComplete="none"
                className="input-applicant"
                disabled
              />
            </Col>
            <Col>
              <br></br>
              <Form.Label>
                <img src="https://img.icons8.com/material-outlined/20/4267b2/planner.png" />
                &nbsp;When do you want to move?
              </Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={applicant.date}
                autoComplete="none"
                className="input-applicant"
                disabled
              />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3" align="center">
              <br></br>

              <Form.Check
                inline
                label="Applied"
                name="status"
                type="radio"
                id="applied"
                value="Applied"
                checked={applicant.status === "Applied"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="In-progress"
                name="status"
                type="radio"
                id="inprogress"
                value="In-progress"
                checked={applicant.status === "In-progress"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Accept"
                name="status"
                type="radio"
                id="accept"
                value="Accept"
                checked={applicant.status === "Accept"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Decline"
                name="status"
                type="radio"
                id="decline"
                value="Decline"
                checked={applicant.status === "Decline"}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col align="center">
              <br></br>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                className="btn btn-secondary btn-block btn-round"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ApplicantDetails;
