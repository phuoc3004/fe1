import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Fail = () => {
  const navigate = useNavigate();

  const handleOnClick = (key) => {
    console.log(key);
    if (key === "console") {
      navigate("/");
    }
    if (key === "buy") {
      navigate("/checkouts"); // Điều hướng đến trang thanh toán
    }
  };

  return (
    <div>
      <Result
        status="error"
        title="Đặt hàng không thành công, vui lòng thử lại"
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
            Thanh toán lại
          </Button>,
        ]}
      />
    </div>
  );
};

export default Fail;
