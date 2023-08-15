import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Reset = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError(null);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.put(
          `http://localhost:5000/members/passwordreset/${match.params.resetToken}`,
          { password },
          config
        );

        console.log(data);
        setSuccess(data.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="row mt-5">
            <h2 className="text-center mb-5 fw-bold fs-1"> Reset Password</h2>
          </div>
          <div className="row">
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> Confirm New Password </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="re-type password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-3">
                Reset Password
              </Button>
              {success && (
                  <div class="alert alert-primary" role="alert">
                    <p className="p1"> password reset success!</p>
                  </div>
                ) && (
                  <Form.Text className="text-muted">
                    <p>
                      {" "}
                      Back to <Link to="/">login</Link>
                    </p>
                  </Form.Text>
                )}
            </Form>
          </div>
        </div>
        <div className="col-md-6">
          <Image
            src="./img/reset-password.jpg"
            thumbnail
            style={{ border: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Reset;
