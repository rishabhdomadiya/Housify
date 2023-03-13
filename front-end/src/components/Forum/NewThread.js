/* 
  authorName : Vishvesh Naik 
  email : vishvesh@dal.ca
*/

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const NewThread = () => {
  const navigate = useNavigate();
  const apiUrl = "https://group12-backend.herokuapp.com/addthread";

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const [threadInfo, setThreadInfo] = useState({
    title: "",
    reply: "",
  });

  const handleChange = (e) => {
    const newData = { ...threadInfo };
    newData[e.target.id] = e.target.value;
    setThreadInfo(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(apiUrl, {
        title: threadInfo.title,
        description: threadInfo.reply,
        email: `${localStorage.getItem("email")}`,
      })
      .then((res) => {
        console.log("Submitted", res.data);
        window.alert("Thread Successfully Created");
        navigate(-1);
      });
  };

  return (
    <div className="container table-div">
      <div
        className="card text-center"
        style={{ width: "45%", justifyContent: "center" }}
      >
        <div className="card-body">
          <h5
            style={{
              color: "#FFF",
              background: "#4267b2",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Thread Information
          </h5>
        </div>
        <div className="card-body" style={{ padding: "5px" }}>
          <Form>
            <div className="card-body">
              <Form.Group className="mb-3">
                <Form.Control
                  id="title"
                  as="input"
                  rows={3}
                  placeholder="Title"
                  defaultValue={threadInfo.title}
                  onChange={handleChange}
                />
                <div> &nbsp;</div>
                <Form.Control
                  id="reply"
                  as="textarea"
                  rows={3}
                  placeholder="Write your description here"
                  defaultValue={threadInfo.reply}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="mb-3">
              <Button
                onClick={handleBack}
                className="btn mb-2 mb-md-0 btn-secondary btn-block btn-round"
              >
                Back
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                onClick={handleSubmit}
                className="btn mb-2 mb-md-0 btn-secondary btn-block btn-round"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewThread;
