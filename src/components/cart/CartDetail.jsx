import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CartDetail.scss";
import CartItem from "./CartItem";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getAllCartItems } from "../../api/carts";

const CartDetail = (props) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getAllCartItems();
        setCartItems(response || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // const { items, totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.quantity;
      }, 0);
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [cartItems]);

  const checkoutsHandler = () => {
    if (props.drawer) {
      props?.drawer(false);
    }
    navigate(`/checkouts`);
  };

  const renderCartItem = cartItems.map((item) => {
    return <CartItem key={item.id} product={item} />;
  });

  return (
    <Row gutter={64} style={{ marginTop: 32 }}>
      <Col md={18}>
        <div className="item__title">GIỎ HÀNG</div>
        <div className="item" direction={"vertical"} size={0}>
          <div className="item__count">
            You have <span>{cartItems.length} products</span> in your cart
          </div>
          <div>{renderCartItem}</div>
        </div>
      </Col>
      <Col md={6} style={{ position: "relative" }}>
        <div className="item__bill">
          <div className="item__bill_title border-bottom-solid">
            CART INFORMATION
          </div>
          <div className="item__total border-bottom-solid">
            <span className="item__total_title">Total:</span>
            <span className="item__total_number">{totalAmount} VNĐ</span>
          </div>
          <div className="item__sub" onClick={() => navigate("/")}>
            You can buy more{" "}
            <ArrowRightOutlined style={{ margin: "0px 4px" }} />
          </div>
          <div className="item__btn_group">
            <div className="item__btn" onClick={checkoutsHandler}>
              CHECKOUTS
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CartDetail;
