import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ForgetMessage from "../../components/ForgetMessage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/members/forgetpassword",
        { email },
        config
      );

      console.log(data);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="row mt-5">
            <h2 className="text-center mb-5 fw-bold fs-1">Forgot Password</h2>
          </div>
          {<ForgetMessage />}
          <div className="row">
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-3">
                Submit
              </Button>
              <Form.Text className="text-muted">
                <p>
                  {" "}
                  New User? <Link to="/register">Register Here</Link>
                </p>
              </Form.Text>
            </Form>
          </div>
        </div>
        <div className="col-md-6">
          <Image
            src="./img/forgot-password.png"
            thumbnail
            style={{ border: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
