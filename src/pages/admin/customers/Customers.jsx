import { Table } from "antd";
import { useState, useEffect } from "react";
// import { getToken } from "../../../api/users";
// import { useNavigate } from "react-router-dom";
import { getCustomersOrders } from "../../../api/users";
// import moment from "moment";

const Customer = () => {
  const [orders, setOrders] = useState([]);
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "index",
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Số tiền đã thanh toán (VNĐ)",
      dataIndex: "amountPayed",
      sorter: (a, b) => a.amountPayed - b.amountPayed,
      sortDirections: ["descend", "ascend"],
      render: (amountPayed) => amountPayed.toLocaleString("vi-VN"),
    },
  ];
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getCustomersOrders();
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);
  console.log(orders);

  const data = [];
  for (let i = 1; i < orders.length + 1; i++) {
    data.push({
      index: i,
      id: `KH${orders[i - 1].id}`,
      name: orders[i - 1].name,
      email: orders[i - 1].email,
      address: orders[i - 1].address,
      phone: orders[i - 1].phone,
      amountPayed: orders[i - 1].amountPayed,
    });
  }

  return (
    <>
      <div
        style={{
          marginTop: 25,
          display: "flex",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 30,
        }}
      >
        DANH SÁCH THÀNH VIÊN
      </div>
      <div>
        <div
          style={{
            marginBottom: 16,
          }}
        ></div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </>
  );
};
export default Customer;
