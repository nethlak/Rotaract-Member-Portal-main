import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState("");

  const history = useHistory();

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
        "http://localhost:5000/members/login",
        {
          email,
          password,
        },
        config
      );

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/home");
    } catch (error) {
      setError(error.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="row mt-5">
            <h2 className="text-center mb-5 fw-bold fs-1">Login</h2>
          </div>
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

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  {" "}
                  Password <Link to="/fogot">forgot password ?</Link>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-3">
                Login
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
          <Image src="./img/login.jpg" thumbnail style={{ border: "none" }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
