import axios from "axios";
import  { useState } from "react";
import { Form, Button,  Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const response = await axios.post(`${BASE_URL}register`, formData);
    if (response.data.data) {
      alert("User Registered Successfully");
      navigate("/login");
    } else {
      alert("User Registration Failed ");
    }
  };
  const navigate = useNavigate();
  return (
    <div style={{ background: 'linear-gradient(to right, #67B26F, #4ca2cd)', height: "100vh", overflow: "hidden" }}>
      <Row className="justify-content-md-center">
        <Col
          md={8}
          lg={4}
          style={{
            background: "white",
            padding: "20px 40px 50px 40px",
            borderRadius: "10px",
            marginTop: "10%",
          }}
        >
          <h3 className="text-center mb-4">Register</h3>
          <Form onSubmit={handleSubmit}>
            {/* Name Field */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
