/* 
  authorName : Vishvesh Naik 
  email : vishvesh@dal.ca
*/

import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../UI/Card";

const ThreadReply = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [thread, setThread] = React.useState({
    title: "",
    description: "",
    replies: [
      {
        _id: "",
        __v: "",
        replyDate: "",
        replyDesc: "",
        replyStatus: true,
        threadId: "",
        userName: "",
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const r = document.getElementById("reply").value.trim();
    if (r !== "") {
      axios
        .post("https://group12-backend.herokuapp.com/thread/addThreadReply", {
          replyDesc: r,
          threadId: id,
          email: localStorage.getItem("email"),
        })
        .then((res) => {
          window.alert("Reply Successfully Added");
          getThread();
        });
    } else {
      alert("Please enter a reply");
    }
    console.log("Submitted");
  };

  const getThread = () => {
    fetch(
      `https://group12-backend.herokuapp.com/thread/getThreadData?threadId=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setThread(data);
        console.log(data);
      })
      .catch((err) => {
        navigate("/forum");
      });
  };
  useEffect(() => {
    getThread();
  }, []);
  return (
    <>
      <div
        className="card-body"
        style={{
          padding: "3rem",
        }}
      >
        <h5 className="card-title">{thread.title}</h5>
        <p
          className="card-text"
          style={{ fontStyle: "italic", fontWeight: "50" }}
        >
          {thread.description}
        </p>
        <hr />
        <ul>
          {thread.replies.map((r, i) => {
            const date = new Date(r.replyDate);
            return (
              <li
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ccc",
                  paddingTop: "15px",
                  paddingBottom: "5px",
                  paddingRight: "2rem",
                }}
              >
                <p>{r.replyDesc}</p>
                <p></p>
                <p style={{ fontStyle: "italic", fontWeight: "50" }}>
                  by {r.userName} on {date.toDateString()}
                </p>
              </li>
            );
          })}
        </ul>
        <Form
          style={{
            paddingTop: "15px",
          }}
        >
          <Card>
            <div className="card-body">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                {/* <Form.Label>Reply</Form.Label> */}
                <Form.Control
                  id="reply"
                  as="textarea"
                  rows={3}
                  placeholder="Write your reply here"
                />
              </Form.Group>
              <Button onClick={handleSubmit}>Reply</Button>
            </div>
          </Card>
        </Form>
      </div>
    </>
  );
};

export default ThreadReply;
