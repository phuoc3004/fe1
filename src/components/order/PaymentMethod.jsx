import React, { useState, useEffect } from "react";
import { Button, Radio } from "antd";
import { createPaymentVNPay, createOrderCOD } from "../../api/orders";

const PaymentMethod = ({ orderInfo }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    setOrder(orderInfo);
    console.log("Order: ", order);
  }, [orderInfo, order]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = async () => {
    try {
      if (paymentMethod === "COD") {
        // Thanh toán COD
        const response = await createOrderCOD(orderInfo);
        window.location.href = "/payment/success";
        console.log(response);
      } else if (paymentMethod === "VNPAY") {
        // Thanh toán VNPAY
        const response = await createPaymentVNPay(orderInfo);
        console.log(response);
        // Redirect đến trang thanh toán VNPAY
        window.location.href = response.redirect_url;
      } else {
        console.error("Phương thức thanh toán không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán", error);
    }
  };

  return (
    <div>
      <h2>Chọn phương thức thanh toán:</h2>
      <Radio.Group
        onChange={handlePaymentMethodChange}
        value={paymentMethod}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>
        <Radio value="VNPAY">Thanh toán qua VNPAY</Radio>
      </Radio.Group>
      <Button
        type="primary"
        onClick={handlePayment}
        style={{ marginTop: 16, marginBottom: 20 }}
      >
        Thanh toán
      </Button>
    </div>
  );
};

export default PaymentMethod;
