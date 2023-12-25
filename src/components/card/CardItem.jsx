import { Col, Image, Skeleton } from "antd";
import React from "react";
import "./CardItem.scss";
import LazyLoad from "react-lazyload";
import { useNavigate } from "react-router-dom";
const CardItem = (props) => {
  const navigate = useNavigate();
  const clickCardHandler = (e) => {
    navigate(`/collections/${props.title}`);
  };
  return (
    <Col
      xs={24}
      md={8}
      style={{ position: "relative" }}
      onClick={clickCardHandler}
    >
      <div className="options">
        <div className="options__title">{props.title}</div>
        <div className="options__btn">SEE MORE</div>
      </div>
      <div className="box">
        <LazyLoad height={673} placeholder={<Skeleton.Image active />}>
          <Image className="box__image" src={props.src} preview={false} />
        </LazyLoad>
      </div>
    </Col>
  );
};

export default CardItem;
