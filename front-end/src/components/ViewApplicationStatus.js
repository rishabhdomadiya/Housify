/* 
  authorName : Dhruv Oza 
  email : dhruv.oza@dal.ca
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";

const ViewApplicationStatus = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState([]);

  const convertDate = (date) => {
    return date.substr(0, 10);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = (e) => {
    axios
      .get(
        "https://group12-backend.herokuapp.com/applicationdashboardRoute/applications"
      )
      .then((res) => {
        if (res.data.success) {
          setApplication(res.data.applications);
        }
      })
      .catch((error) => {
        alert("Values entered wrong!!");
      });
  };

  const deleteApplication = (app) => {
    axios
      .post(
        "https://group12-backend.herokuapp.com/applicationdashboardRoute/deleteApplication",
        { app }
      )
      .then((res) => {
        alert(" Deleted successfully");
        loadApplications();
      })
      .catch((error) => {
        alert("Values entered wrong!!");
      });
  };

  return (
    <>
      <h4
        style={{
          color: "#4267b2",
          padding: "10px",
          margin: "25px 10px -20px 10px",
        }}
      >
        Application Status
      </h4>

      <Container fluid style={{ padding: "20px" }}>
        {application.length !== 0 ? (
          <>
            <div style={{ margin: "20px" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Application Number</th>
                    <th>Applicant Name</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {application.filter(emailID => emailID.email===localStorage.email).map((filteredEmail, index) => {
                      return(
                        <tr key={index}>
                          <td>{filteredEmail.email}</td>
                          <td>{filteredEmail.applicationID}</td>
                          <td>{filteredEmail.fullName}</td>
                          <td>{convertDate(filteredEmail.applieddate)}</td>
                        </tr>
                      );})} */}
                  {application
                    .filter((emailID) => emailID.email === localStorage.email)
                    .map((filteredEmail, index) => {
                      return (
                        <tr key={index}>
                          <td>{filteredEmail.applicationID}</td>
                          <td>{filteredEmail.fullName}</td>
                          <td>{convertDate(filteredEmail.applieddate)}</td>
                          <td>{filteredEmail.status}</td>
                          <Row>
                            <Col>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => deleteApplication(filteredEmail)}
                                className="btn btn-secondary btn-block btn-round"
                              >
                                Delete
                              </Button>
                            </Col>
                            {filteredEmail.status === "Accept" && (
                              <Col>
                                <LinkContainer to="/payment">
                                  <Button
                                    variant="success"
                                    size="sm"
                                    className="btn-block btn-round"
                                  >
                                    Pay-rent
                                  </Button>
                                </LinkContainer>
                              </Col>
                            )}
                            {filteredEmail.status === "Accept" && (
                              <Col>
                                <LinkContainer to="/show-payments">
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    className="btn-block btn-round"
                                  >
                                    Show Payments
                                  </Button>
                                </LinkContainer>
                              </Col>
                            )}
                          </Row>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <center>
            <h3 color="#000">No application found</h3>
          </center>
        )}
      </Container>
    </>
  );
};

export default ViewApplicationStatus;
