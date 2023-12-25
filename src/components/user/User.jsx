import {
  Avatar,
  Form,
  Image,
  Input,
  // Row,
  Select,
  Space,
  Button,
} from "antd";
// import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import "./User.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfile, userEditProfile } from "../../stores/user/user-slice";
import login from "../../assets/images/login.jpg";

const User = (props) => {
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userToken = localStorage.getItem("token");
  const [values, setValues] = useState({
    name: "",
    address: "",
    phone: "",
    gender: "",
    avatar: "",
  });

  useEffect(() => {
    if (userToken) {
      setIsLogin(true);
      dispatch(userProfile(userToken)).then((response) => {
        console.log(response);
      });
    }
  }, [dispatch, userToken]);

  useEffect(() => {
    setValues({
      name: user?.name || "",
      address: user?.address || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      avatar: user?.avatar || "",
    });
  }, [user]);

  const onLoginHandler = () => {
    if (props.onLogin) {
      navigate("/account/login");
    } else {
      props?.drawer(false);
      navigate("/account/login");
    }
  };

  const handleChange = (value, field) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    const updateData = {
      name: values.name,
      address: values.address,
      gender: values.gender,
      phone: values.phone,
      avatar: values.avatar,
    };
    console.log(updateData);
    dispatch(userEditProfile(updateData));
    window.location.reload();
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Xóa token trong localStorage
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Space className="infor" style={{ borderRadius: 10 }}>
      {isLogin ? (
        <p className="infor__title">User Information</p>
      ) : (
        <p className="infor__title">Login</p>
      )}

      <Avatar
        size={{
          xs: 24,
          sm: 32,
          md: 40,
          lg: 64,
          xl: 80,
          xxl: 100,
        }}
        src={
          <Image
            src={user.avatar ? user.avatar : login}
            alt="Avatar"
            className="login-icon"
          ></Image>
        }
        className="infor__avatar"
      />
      {isLogin ? (
        <Space className="infor__container">
          <Form form={form} layout="vertical">
            <Form.Item name="userName" label="Username">
              <Input
                style={{ width: "280px" }}
                className="name"
                placeholder="UserName"
                readOnly={!isEditing}
                value={values.name}
                onChange={(e) => handleChange(e.target.value, "name")}
              />
              <span style={{ display: "none" }}>
                {JSON.stringify(values.name)}
              </span>
            </Form.Item>

            <Form.Item name="address" label="Address">
              <Input
                className="address"
                placeholder="Address"
                readOnly={!isEditing}
                value={values.address}
                onChange={(e) => handleChange(e.target.value, "address")}
              />
              <span style={{ display: "none" }}>{values.address}</span>
            </Form.Item>

            <Form.Item label="Gender">
              <Select
                className="gender"
                value={values.gender}
                disabled={!isEditing}
                onChange={(value) => handleChange(value, "gender")}
              >
                <Select.Option key="MALE">MALE</Select.Option>
                <Select.Option key="FEMALE">FEMALE</Select.Option>
                <Select.Option key="OTHER">OTHER</Select.Option>
              </Select>
              <span style={{ display: "none" }}>{values.gender}</span>
            </Form.Item>

            <Form.Item name="email" label="Email: ">
              <Input placeholder="Email" readOnly="true" value={user.email} />
              <span style={{ display: "none" }}>{user.email}</span>
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input
                className="phone"
                placeholder="Phone"
                readOnly={!isEditing}
                value={values.phone}
                onChange={(e) => handleChange(e.target.value, "phone")}
              />
              <span style={{ display: "none" }}>{user.phone}</span>
            </Form.Item>
            <Space>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} type="primary">
                  Edit
                </Button>
              )}
              {isEditing && (
                <Button onClick={handleUpdate} type="primary">
                  Update
                </Button>
              )}
              <Button onClick={handleLogout} type="primary">
                Logout
              </Button>
            </Space>
          </Form>
        </Space>
      ) : (
        <>
          <p>Please login to order and ...</p>
          <div
            className="cart__btn_w"
            style={{ margin: 0 }}
            onClick={onLoginHandler}
          >
            Login
          </div>
        </>
      )}
    </Space>
  );
};

export default User;
