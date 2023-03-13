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

function CheckMail() {
  const navigate = useNavigate();

  return (
    <Form>
      <div className="outer">
        <div className="inner">
          <div className="button-center">
            <img src={Logo} height={100} width={100} alt="Housify Logo" />
          </div>
          <h3>Check Mail Box</h3>
          <br />
          <div className="form-group">
            <p>
              We have sent you email confirmation, please verify your identity
              by visiting your mail box.
            </p>
          </div>
          <br />
          <div>
            <hr className="simple-line" />
          </div>
          <div className="button-center forgot-password text-right">
            <p className="forgot-password text-right">
              <h6>
                Click here for <NavLink to="/sign-in">log in</NavLink>
              </h6>
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default CheckMail;
