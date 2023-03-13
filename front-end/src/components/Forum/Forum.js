/* 
  authorName : Vishvesh Naik 
  email : vishvesh@dal.ca
*/

import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Forum.module.css";
import axios from "axios";

const Forum = () => {
  let navigate = useNavigate();
  const apiUrl = "https://group12-backend.herokuapp.com/getthread";

  const [threadInfo, setThreadInfo] = useState([]);

  const onClickHandler = () => {
    console.log("clicked");
    navigate("/thread");
  };

  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      setThreadInfo(res.data);
    });
  }, []);

  return (
    <>
      <div className="container my-3">
        <div className={classes.button} style={{ paddingTop: "0.5rem" }}>
          <Button
            className="btn btn-lg btn-primary"
            onClick={onClickHandler}
            style={{ backgroundColor: "#4267b2" }}
          >
            New Thread
          </Button>
        </div>
        <Table bordered responsive>
          <thead style={{ backgroundColor: "#c7c7c7" }}>
            <tr>
              <th scope="col" className="topic-col">
                Topics
              </th>
              <th scope="col" className="topic-col">
                Created On
              </th>
            </tr>
          </thead>

          {threadInfo.map((thread, index) => {
            const newDate = new Date(thread.date);

            return (
              <tbody>
                <tr>
                  <td>
                    <NavLink to={"/thread/" + thread._id}>
                      <p style={{ color: "black" }}>{thread.title}</p>
                    </NavLink>
                  </td>
                  <td>
                    <div>by {thread.name}</div>
                    <div>{newDate.toDateString()}</div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    </>
  );
};

export default Forum;
