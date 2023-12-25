import { Button, Checkbox, Col, Form, Input, Row, Select, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userRegister } from "../../stores/user/user-slice";
import _ from 'lodash';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { agreement, prefix, confirm, gender, ...filteredValues } = values;
    const updatedValues = {
      ...filteredValues,
      gender: gender.toUpperCase(),
    };

    dispatch(userRegister(updatedValues))
    .unwrap()
      .then((response) => {
        console.log(response);
        navigate("/account/login");
      });
    console.log("Received values of form: ", updatedValues);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
        defaultValue={0}
      >
        <Option key={"0"} value="+84">
          +84
        </Option>
      </Select>
    </Form.Item>
  );

  return (
    <Row justify={"center"} className="loginPage__row">
      <Col
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid #ccc",
        }}
        className="loginPage__col"
      >
        <Space className="wrapper login__container">
          <span className="login__title">REGISTER</span>
          <span className="login__sub">Register for receive notice!</span>
        </Space>
      </Col>
      <Col md={12} className="login__col">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
              <Option value="OTHER">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the{" "}
              <Link
                to="https://facebook.com/hipgat/"
                target="_blank"
                style={{ textDecoration: "underline", color: "#000" }}
              >
                agreement
              </Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            <span style={{ marginTop: 8 }}>
              Have account?{" "}
              <Link
                to="/account/login"
                style={{
                  textDecoration: "underline",
                  color: "#000",
                }}
                title="Login"
              >
                Login now!
              </Link>
            </span>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default Register;
