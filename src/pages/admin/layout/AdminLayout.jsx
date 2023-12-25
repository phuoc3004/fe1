// AdminLayout.jsx
import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/header/AdminHeader";
import {
  DesktopOutlined,
  DollarOutlined,
  HomeOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import Authenticate from "../../../guards/Authenticate";

const { Content } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Home", "/admin", <HomeOutlined />),
  getItem("Customer", "/admin/users", <DesktopOutlined />),
  getItem("Product", "/admin/products/all", <ShopOutlined />),
  getItem("Orders", "/admin/orders", <DollarOutlined />),
];
const AdminLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Authenticate>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["/admin"]}
            mode="inline"
            items={items}
            style={{ marginTop: 59.6, paddingTop: 0 }}
            onClick={(item) => navigate(item.key)}
          />
        </Sider>
        <Layout>
          <AdminHeader />
          <Content
            style={{
              margin: "0 16px",
              height: "calc(100vh - 64px)", // subtract the height of the header
              overflow: "auto", // add this line
            }}
          >
            <div
              style={{
                padding: 0,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Authenticate>
  );
};

export default AdminLayout;
