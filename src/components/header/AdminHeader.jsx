import React from "react";
import "./AdminHeader.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-header">
      <h1 className="title">DASHBOARD</h1>
      <LogoutOutlined
        style={{ fontSize: 32, color: "white", marginRight: 32 }}
        onClick={handleLogout}
      />
    </div>
  );
};

export default AdminHeader;
