import React, { useEffect, useState } from "react";
import "./Cart.scss";
import CartItemPreview from "./CartItemPreview";
import { useNavigate } from "react-router-dom";
import { getAllCartItems } from "../../api/carts";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

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

  useEffect(() => {
    const cartContainer = document.querySelector(".cart__container");
    if (cartItems.length > 3) {
      cartContainer.classList.add("cart_scroll");
    } else {
      cartContainer.classList.remove("cart_scroll");
    }
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
    navigate("/checkouts");
  };

  const cartHandler = () => {
    if (props.drawer) {
      props?.drawer(false);
    }
    navigate("/cart");
  };

  const ordersHandler = () => {
    if (props.drawer) {
      props?.drawer(false);
    }
    navigate("/orders");
  };

  const renderCartItem = cartItems.map((item) => (
    <CartItemPreview key={item.id} product={item} />
  ));

  return (
    <div className="cart">
      <div className="cart__title">CART</div>
      <div className="cart__content">
        {!cartItems.length && <p className="cart__alert">BUY SOMETHING.</p>}
        <div className="cart__container">{renderCartItem}</div>
      </div>
      <div className="cart__total">
        <span className="cart__total_title">TOTAL:</span>
        <span className="cart__total_number">{totalAmount} VNĐ</span>
      </div>
      <div className="cart__btn">
        <div className="cart__btn_w" onClick={cartHandler}>
          CARTS
        </div>
        <div className="cart__btn_checkout" onClick={checkoutsHandler}>
          CHECKOUTS
        </div>
        <div className="cart__btn_checkout" onClick={ordersHandler}>
          ORDERS
        </div>
      </div>
    </div>
  );
};

export default Cart;
