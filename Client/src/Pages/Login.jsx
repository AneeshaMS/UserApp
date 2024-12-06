import axios from "axios";
import  { useState } from "react";
import { Form, Button,  Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    const response = await axios.post(`${BASE_URL}login`, formData);
    console.log(response);
    if (response.data.message === "Success") {
      alert("User Loggedin Successfully");
      navigate("/user");
    } else {
      alert(response.data.message);
    }
  };

  const navigate = useNavigate();
  return (
    <div style={{ background: 'linear-gradient(to right, #67B26F, #4ca2cd)', height: "100vh", overflow: "hidden" }}>
      <Row className="justify-content-center">
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
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
