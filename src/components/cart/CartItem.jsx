import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Image, InputNumber, Space } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, deleteCartItem } from "../../stores/cart/cart-slice";
import { deleteCartItemApi } from "../../api/carts";
import "./CartItem.scss";
const CartItem = (props) => {
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
        <div className="cartItem__size">{props?.product?.size}</div>
        <div className="cartItem__size">{props?.product?.color}</div>
      </Space>
      <Space.Compact className="cartItem__quantity" block>
        <div className="cartItem__btn" onClick={onDeleteQuantityHandler}>
          <MinusOutlined />
        </div>
        <Form form={form}>
          <InputNumber
            min={1}
            keyboard={true}
            defaultValue={previousValue}
            value={quantity}
            controls={false}
            size="large"
            onBlur={changeQuantityHandler}
          />
        </Form>

        <div className="cartItem__btn" onClick={onAddQuantityHandler}>
          <PlusOutlined />
        </div>
      </Space.Compact>
      <div className="cartItem__price" style={{ paddingLeft: 20 }}>
        {props.product?.price}
      </div>
      <div className="cartItem__total">
        <div className="cartItem__total_title">Into money:</div>
        <div className="cartItem__total_price">
          {props.product?.price * quantity}VNĐ
        </div>
        <div className="cartItem__del">
          <DeleteOutlined onClick={deleteProductHandler} />
        </div>
      </div>
    </Space>
  );
};

export default CartItem;
