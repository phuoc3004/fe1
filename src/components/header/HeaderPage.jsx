import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Drawer, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cart from "../cart/Cart";
import SearchForm from "../search/SearchForm";
import User from "../user/User";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
// import { useSelector } from "react-redux";
import { getAllCartItems } from "../../api/carts";

const HeaderPage = () => {
  const { pathname } = useLocation();
  const [isScroll, setIsScroll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerItem, setDrawerItem] = useState("");
  const [cartItems, setCartItems] = useState([]);
  // const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getAllCartItems();
        setCartItems(response);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 240) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsDrawerVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };
  const openDrawerHandler = (item) => {
    setOpenDrawer(!openDrawer);
    setDrawerItem(item);
  };
  const renderDrawerContent = (key) => {
    switch (key) {
      case "cart":
        return <Cart drawer={setOpenDrawer} />;
      case "user":
        return <User drawer={setOpenDrawer} />;
      case "search":
        return <SearchForm />;

      default:
        break;
    }
  };
  const links = [
    {
      label: "HOME",
      href: "/",
    },
    {
      label: "SHIRTS",
      href: "/collections/shirt",
    },
    {
      label: "PANTS",
      href: "/collections/pants",
    },
    {
      label: "ACCESSORIES",
      href: "/collections/accessories",
    },
  ];
  const navItems = links.map((item, index) => {
    return (
      <div key={index} className="navbar__item">
        <Link
          className={`navbar__item_content ${
            pathname === item.href ? "active" : ""
          }`}
          to={item.href}
        >
          {item.label}
        </Link>
      </div>
    );
  });
  return (
    <header className={`header ${isScroll ? "header__black" : ""}`}>
      <Col md={4}>
        <Link to={"/"} className="logo">
          <div className="box">
            <img className="vector" alt="Vector" src={logo} />
          </div>
        </Link>
      </Col>
      {isMobile ? (
        <>
          <Drawer
            placement="right"
            onClose={() => setIsDrawerVisible(false)}
            open={isDrawerVisible}
            className="mobile-menu"
            width={"50vw"}
          >
            <Menu
              onClick={() => setIsDrawerVisible(false)}
              selectedKeys={[pathname]}
            >
              {navItems}
            </Menu>
          </Drawer>
        </>
      ) : (
        <Space className="navbar">{navItems}</Space>
      )}
      <Col md={4}>
        <Space className="icon">
          <SearchOutlined
            title="Search"
            className="icon__i"
            onClick={() => openDrawerHandler("search")}
          />
          <UserOutlined
            title="Profile"
            className="icon__i"
            onClick={() => openDrawerHandler("user")}
          />
          <ShoppingCartOutlined
            title="Cart"
            className="icon__i"
            onClick={() => openDrawerHandler("cart")}
          />
          {openDrawer && (
            <Drawer
              placement="right"
              onClose={() => setOpenDrawer(false)}
              open={openDrawer}
              className="mobile-menu"
              width={isMobile ? "50vw" : "30%"}
            >
              {renderDrawerContent(drawerItem)}
            </Drawer>
          )}
          <span className="quantity">({cartItems.length})</span>
          {/* <span className="quantity">3</span> */}
          {isMobile && (
            <MenuOutlined className="menu-icon" onClick={handleMenuClick} />
          )}
        </Space>
      </Col>
    </header>
  );
};

export default HeaderPage;
