import React, { useState } from "react";
import { Card, Input, Button, Form, message } from "antd";
import { registerUser } from "../api/users";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await registerUser(values);
      console.log("response : ", response);
      message.success("Register successful!");
      // store token in local storage
      localStorage.setItem("token", response.data.token);
      navigate("/profile");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Register failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h1 className="login-title">Register</h1>
        <Form name="login-form" onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="login-link-container">
          Already a User? <Link to="/login"> Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
