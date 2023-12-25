import { Button, Modal, Steps, theme } from "antd";
import { useState, useEffect } from "react";
import { getToken } from "../../api/users";
import { useNavigate } from "react-router-dom";
import OrderInformation from "../order/OrderInformation";
import AddressDelivery from "../order/AddressDelivery";
import PaymentMethod from "../order/PaymentMethod";
import "./CheckOut.scss";

const CheckOut = () => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [orderInfo, setOrderInfo] = useState({
    amount: 0,
    addressDelivery: "",
    productId: 0,
    color: "",
    size: "",
    quantity: 1,
  });

  const updateDeliveryAddress = (address) => {
    setDeliveryAddress(address);
  };

  const handleTotalAmountChange = (amount) => {
    setAmount(amount);
  };

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("item"));
    setOrderInfo({
      amount: item ? item.product.product.price * item?.quantity : amount,
      addressDelivery: deliveryAddress,
      productId: item?.productId,
      color: item?.color,
      size: item?.size,
      quantity: item?.quantity,
    });
  }, [amount, deliveryAddress]);

  const steps = [
    {
      title: "Thông tin đơn hàng",
      content: (
        <OrderInformation
          onTotalAmountChange={handleTotalAmountChange}
        ></OrderInformation>
      ),
    },
    {
      title: "Địa chỉ giao hàng",
      content: (
        <AddressDelivery
          onUpdateAddress={updateDeliveryAddress}
        ></AddressDelivery>
      ),
    },
    {
      title: "Phương thức thanh toán",
      content: <PaymentMethod orderInfo={orderInfo}></PaymentMethod>,
    },
  ];
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Chuyển hướng đến trang đăng nhập"
  );
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("Chuyển hướng đến trang đăng nhập");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      navigate("/account/login");
    }, 1500);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: 1,
    textAlign: "center",
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const cancelPayment = () => {
    localStorage.removeItem("item");
    navigate("/cart");
  };

  return getToken() === null ? (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ width: 200, height: 50, marginTop: 50, marginLeft: 555 }}
      >
        LOGIN TO CONTINUE
      </Button>
      <Modal
        title="Thông báo"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  ) : (
    <>
      <div className="item__title" style={{ marginTop: 40 }}>
        THANH TOÁN
      </div>
      <Steps current={current} items={items} style={{ marginTop: 40 }} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
      <Button type="danger" onClick={cancelPayment} className="myButton">
        Hủy đơn hàng
      </Button>
    </>
  );
};
export default CheckOut;
