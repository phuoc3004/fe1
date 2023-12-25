import React from "react";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Card, Space, Image, Modal, Button } from "antd";
import "./Item.scss";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import DetailProduct from "./DetailProduct";

const { Meta } = Card;

const Item = (props) => {
  const product = props?.product.product;
  const productVariants = props?.product.productVariants;
  const totalQuantity = productVariants.reduce(
    (total, variant) => total + variant.quantity,
    0
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEllipsisModalOpen, setIsEllipsisModalOpen] = useState(false);

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const showEllipsisModal = () => {
    setIsEllipsisModalOpen(true);
  };

  const handleOk = () => {
    setIsEditModalOpen(false);
    setIsEllipsisModalOpen(false);
  };

  return (
    <Space>
      <Card
        className="card_container"
        cover={
          <div className="card_container-image">
            <Image
              width={300}
              height={295}
              src={product?.image}
              preview={true}
              className="product__image"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        }
        actions={[
          <EditOutlined key="edit" onClick={showEditModal} />,
          <EllipsisOutlined key="ellipsis" onClick={showEllipsisModal} />,
        ]}
      >
        <Modal
          title="Chỉnh sửa sản phẩm"
          open={isEditModalOpen}
          centered
          closable={false}
          footer={[
            <Button key="submit" type="ghost" onClick={handleOk}>
              Đóng
            </Button>,
          ]}
        >
          <UpdateProduct product={product} />
        </Modal>

        <Modal
          title="Chi tiết sản phẩm"
          open={isEllipsisModalOpen}
          centered
          closable={false}
          footer={[
            <Button key="submit" type="ghost" onClick={handleOk}>
              Đóng
            </Button>,
          ]}
        >
          <DetailProduct productVariants={productVariants} />
        </Modal>
        <Meta title={product.name} />
        <Meta
          description={product.description}
          style={{
            paddingTop: 5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "250px",
            wordWrap: "break-word",
          }}
        />
        <Meta
          description={"Giá: " + product.price.toLocaleString("vi-VN") + " VNĐ"}
          style={{ paddingTop: 5 }}
        />
        <Meta description={"Kho: " + totalQuantity} style={{ paddingTop: 5 }} />
      </Card>
    </Space>
  );
};
export default Item;
