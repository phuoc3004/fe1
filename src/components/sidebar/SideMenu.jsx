import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideMenu.scss";
import { SkinOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("CLOTHES", "collections", <SkinOutlined />, [
    getItem("SHIRT", "shirt"),
    getItem("PANT", "pants"),
    getItem("ACCESSORIES", "accessories"),
  ]),
  // getItem("SMART DEVICE", "smart-devices", <MobileOutlined />, [
  //   getItem("PHONES", "PHONES"),
  //   getItem("LAPTOPS", "LAPTOPS"),
  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 7", "7"),
  //     getItem("Option 8", "8"),
  //   ]),
  // ]),
  {
    type: "divider",
  },
];

const SideBar = () => {
  const { pathname } = useLocation();
  const [, setMainPath] = useState("");
  const navigate = useNavigate();
  const pathArr = pathname.split("/").filter((item) => item);

  useEffect(() => {
    setMainPath(pathArr[0]);
  }, [pathArr]);

  const onClick = (e) => {
    const childPath = e.key;
    const parentPath = e.keyPath[1];
    const path = "/" + parentPath + "/" + childPath;
    navigate(path);
  };

  return (
    <Menu
      onClick={onClick}
      className="menubox"
      defaultSelectedKeys={[`${pathArr[1]}`]}
      defaultOpenKeys={["collections"]}
      mode="inline"
    >
      {items.map((item) => {
        if (item.children) {
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>{child.label}</Menu.Item>
              ))}
            </SubMenu>
          );
        } else if (item.type === "divider") {
          return <Menu.Divider key={item.key} />;
        } else {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
};

export default SideBar;
