import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleOnClick = (key) => {
    localStorage.removeItem("item");
    console.log(key);
    if (key === "console") {
      navigate("/");
    }
    if (key === "buy") {
      navigate("/collections/shirt");
    }
  };

  return (
    <div>
      <Result
        status="success"
        title="Đặt hàng thành công, đơn hàng của bạn sẽ được chuẩn bị giao"
        subTitle=""
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => handleOnClick("console")}
          >
            Trang chủ
          </Button>,
          <Button key="buy" onClick={() => handleOnClick("buy")}>
            Buy Again
          </Button>,
        ]}
      />
    </div>
  );
};
export default Success;
