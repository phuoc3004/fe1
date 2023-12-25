import { Image, Space } from "antd";
import React from "react";
import "./CartItemPreview.scss";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../stores/cart/cart-slice";
const CartItemPreview = (props) => {
  const dispatch = useDispatch();
  console.log(props?.product);
  // const deleteProductHandler = () => {
  //   // const item = {
  //   //   ...props.product,
  //   // };
  //   // dispatch(deleteProduct(item));
  // };
  return (
    <Space style={{ margin: "8px 0", position: "relative" }}>
      <Image src={props.product?.image} width={64}></Image>
      <Space className="clothes wrapper" style={{ alignItems: "flex-start" }}>
        <div className="clothes__name">{props.product?.productName}</div>
        <span
          className="clothes__size"
          style={{ color: "#333", fontSize: 12, fontWeight: "bold" }}
        >
          {props?.product?.size} --- {props?.product?.color}
        </span>
        <Space>
          <Space
            style={{
              color: "#333",
              fontSize: 12,
              backgroundColor: "#ccc",
              width: 24,
              height: 24,
              justifyContent: "center",
            }}
            className="clothes__quantity"
          >
            {props?.product?.quantity}
          </Space>
          <span
            className="clothes__price"
            style={{ color: "#333", fontSize: 12 }}
          >
            {props.product?.price}$
          </span>
        </Space>
      </Space>
      {/* <div className="delBtn">
        <CloseOutlined onClick={deleteProductHandler} />
      </div> */}
    </Space>
  );
};

export default CartItemPreview;
