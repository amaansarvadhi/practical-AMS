import React from "react";
import { Button, Form, Input } from "antd";
import {
  Token,
  Users,
  getItem,
  setItem,
} from "../../Services/LocalStorageManager";
import { UsersConstants } from "../../Constants/userConstants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    try {
      const registeredUsers = getItem(Users) || UsersConstants;

      const user = registeredUsers.find((ele, i) => ele.email === values.email);
      if (!user) {
        alert("User does not exists");
      }

      if (user.password === values.password) {
        console.log("Success:", user);
        setItem(Token, user.email);
        navigate("/");
      } else {
        alert("invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container">
      <div className="login_inside">
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
