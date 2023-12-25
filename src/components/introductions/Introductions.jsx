import {
  CarOutlined,
  InboxOutlined,
  MailOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";

const Introductions = () => {
  return (
    <Row className="introductions">
      <Col xs={24} md={6} className="wrapper ">
        <div className="introductions__icon">
          <CarOutlined className="icon_intro" />
        </div>
        <div className="introductions__title">MIỄN PHÍ GIAO HÀNG</div>
        <div className="introductions__content">VỚI HÓA ĐƠN TỪ 999.000đ</div>
      </Col>
      <Col xs={24} md={6} className="wrapper">
        <div className="introductions__icon">
          <InboxOutlined className="icon_intro" />
        </div>
        <div className="introductions__title">ĐỔI SẢN PHẨM</div>
        <div className="introductions__content">ĐỔI TRẢ TRONG VÒNG 3 NGÀY</div>
      </Col>
      <Col xs={24} md={6} className="wrapper">
        <div className="introductions__icon">
          <ShoppingOutlined className="icon_intro" />
        </div>
        <div className="introductions__title">MUA HÀNG</div>
        <div className="introductions__content">9h00- 22h00, T2-CN</div>
      </Col>
      <Col xs={24} md={6} className="wrapper">
        <div className="introductions__icon">
          <MailOutlined className="icon_intro" />
        </div>
        <div className="introductions__title">LIÊN HỆ CHÚNG TÔI</div>
        <div className="introductions__content">
          E-Mail:{" "}
          <a href="mailto:nguyenhungit0312@gmail.com">nguyenhai@gmail.com</a>
        </div>
      </Col>
    </Row>
  );
};

export default Introductions;
