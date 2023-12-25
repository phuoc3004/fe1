import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, userProfile } from "../../../stores/user/user-slice";
import "./LoginAdmin.scss";
import { getToken } from "../../../api/users";
const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    dispatch(userLogin(values))
      .unwrap()
      .then(() => {
        dispatch(userProfile(getToken())).then((response) => {
          if (response.payload.role === "ADMIN") {
            localStorage.getItem("token")
              ? localStorage.setItem("isAdmin", "true")
              : localStorage.setItem("isAdmin", "false");
            navigate("/admin");
          } else {
            localStorage.setItem("isAdmin", "false");
            messageApi.error("You are not admin");
          }
        });
      })
      .catch(() => {
        messageApi.error("Email or password is incorrect");
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login for ADMIN</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {contextHolder}
        <Form.Item
          name="email"
          rules={[
            {
              type: "text",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            className="input__username input"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            className="input__password input"
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            // style={{
            //   display: "flex",
            //   justifyContent: "right",
            //   alignItems: "center",
            // }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginAdmin;
