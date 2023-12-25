import React from "react";
import { Divider, Table } from "antd";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "index",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Màu",
    dataIndex: "color",
    render: (color) => (
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: color,
          border: "1px solid black",
        }}
      />
    ),
  },
  {
    title: "Kích cỡ",
    dataIndex: "size",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
  },
];

const DetailProduct = (props) => {
  console.log(props?.productVariants);
  const data = [];
  for (let i = 1; i < props?.productVariants.length + 1; i++) {
    data.push({
      index: i,
      color: props?.productVariants[i - 1].color,
      size: props?.productVariants[i - 1].size,
      quantity: props?.productVariants[i - 1].quantity,
    });
  }
  return (
    <div>
      <Divider />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default DetailProduct;
