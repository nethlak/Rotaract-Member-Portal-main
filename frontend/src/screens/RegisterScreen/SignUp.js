import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Image } from "react-bootstrap";
import axios from "axios";

const SignUp = () => {
  const [memberName, setMemberName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [city, setCity] = useState("");
  const [avenue, setAvenue] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [racId, setRacId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsValid(false);
      alert("Passwords does not match!");
    } else {
      setIsValid(true);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "http://localhost:5000/members",
          {
            memberName,
            birthDate,
            academicYear,
            city,
            avenue,
            email,
            password,
            racId,
          },
          config
        );

        console.log(data);

        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
      } catch (err) {
        setError(error.data.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-5 fw-bold fs-1">Sign Up</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGridMemberName">
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridBirthDate">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="Date of Birth"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" placeholder="Upload your Photo" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Avenue</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  value={avenue}
                  onChange={(e) => setAvenue(e.target.value)}
                >
                  <option>...</option>
                  <option>Club Service</option>
                  <option>Professional Development</option>
                  <option>Community Service</option>
                  <option>International Service</option>
                  <option>Sports and Recreational Activities</option>
                  <option>Public Image</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Acedemic Year</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                >
                  <option>...</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRACUOKID">
                <Form.Label>RACUOK ID</Form.Label>
                <Form.Control
                  placeholder="RACUOK21_0001"
                  value={racId}
                  onChange={(e) => setRacId(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="col-md-6">
          <Image src="./img/signup.jpg" thumbnail style={{ border: "none" }} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
