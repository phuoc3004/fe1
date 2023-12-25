import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Image, InputNumber, Space } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  deleteCartItem,
  deleteProduct,
} from "../../stores/cart/cart-slice";
import { deleteCartItemApi } from "../../api/carts";
import "./OrderItem.scss";
const OrderItem = (props) => {
  const [form] = Form.useForm();
  const [quantity, setQuantity] = useState(props?.product?.quantity);
  const [previousValue, setPreviousValue] = useState(quantity);
  const dispatch = useDispatch();
  const changeQuantityHandler = (e) => {
    const inputValue = e.target.value;
    if (!inputValue || isNaN(+inputValue) || inputValue < 0) {
      setQuantity(previousValue);
      return;
    } else {
      const newValue = inputValue - previousValue;
      const item = {
        ...props.product,
        quantity: newValue,
      };
      dispatch(addToCart(item));
      setQuantity(inputValue);
      setPreviousValue(inputValue);
    }
  };

  const deleteProductHandler = async () => {
    const item = {
      ...props.product,
    };

    try {
      console.log(item.id);
      const response = await deleteCartItemApi(item.id);
      console.log(response);
      // dispatch(deleteProduct(item));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const onAddQuantityHandler = () => {
    const item = {
      ...props.product,
      quantity: 1,
    };
    setQuantity(quantity + 1);
    dispatch(addToCart(item));
  };
  const onDeleteQuantityHandler = () => {
    const item = {
      ...props.product,
    };
    console.log(item);
    setQuantity(quantity - 1);
    dispatch(deleteCartItem(item));
  };
  return (
    <Space className="cartItem">
      <Image src={props.product?.image} width={96}></Image>
      <Space className="cartItem__infor" direction="vertical">
        <div className="cartItem__name">{props?.product?.productName}</div>
        <div className="cartItem__size">Kích cỡ: {props?.product?.size}</div>
        <div className="cartItem__size">Màu sắc: {props?.product?.color}</div>
        <div className="cartItem__size">
          Số lượng: {props?.product?.quantity}
        </div>
      </Space>

      <div className="cartItem__price" style={{ paddingLeft: 10 }}>
        Đơn giá: {props.product?.price}
      </div>
      <div className="cartItem__total">
        <div className="cartItem__total_price">Thành tiền: </div>
        <div className="cartItem__total_price">
          {props.product?.price * quantity}VNĐ
        </div>
      </div>
    </Space>
  );
};

export default OrderItem;
