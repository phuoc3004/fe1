import React from "react";
import "./Overview.scss";
import CountUp from "react-countup";
import { Col } from "antd";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { Select, Card, Space, Table, Tag } from "antd";

import { useEffect, useState } from "react";
import { getAllOrdersAdmin, getBestCustomer } from "../../../api/managements";
import { getProductBestSeller } from "../../../api/products";
import { TrophyOutlined, CrownOutlined, StarOutlined } from "@ant-design/icons";

const Overview = () => {
  const [orders, setOrders] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [bestCustomer, setBestCustomer] = useState([]);
  console.log(orders);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrdersAdmin();
        setOrders(response || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await getProductBestSeller();
        setBestSellers(response || []);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };
    fetchBestSellers();
  }, []);

  useEffect(() => {
    const fetchBestCustomer = async () => {
      try {
        const response = await getBestCustomer();
        setBestCustomer(response || []);
      } catch (error) {
        console.error("Error fetching best customer:", error);
      }
    };
    fetchBestCustomer();
  }, []);

  const { Option } = Select;

  const [timePeriod, setTimePeriod] = useState("day");

  const handleTimePeriodChange = (value) => {
    setTimePeriod(value);
  };

  const groupedOrders = orders.reduce((acc, order) => {
    console.log(order.order.orderDate);
    let orderDate;
    if (timePeriod === "month") {
      const date = new Date(order.order.orderDate);
      orderDate = `${date.getFullYear()}/${date.getMonth() + 1}`;
    } else if (timePeriod === "year") {
      orderDate = new Date(order.order.orderDate).getFullYear().toString();
    } else {
      orderDate = new Date(order.order.orderDate).toLocaleDateString("vi-VN");
    }

    if (!acc[orderDate]) {
      acc[orderDate] = 0;
    }
    if (order.order.status === "COMPLETE") {
      acc[orderDate] += order.order.totalPrice;
    }
    // acc[orderDate] += order.order.totalPrice;
    return acc;
  }, {});

  let firstDate = new Date(Object.keys(groupedOrders)[0]);

  if (timePeriod === "day") {
    firstDate.setDate(firstDate.getDate() - 1);
  } else if (timePeriod === "month") {
    firstDate.setMonth(firstDate.getMonth() - 1);
  } else if (timePeriod === "year") {
    firstDate.setFullYear(firstDate.getFullYear() - 1);
  }

  let dayBeforeFirstDate;
  if (timePeriod === "month") {
    dayBeforeFirstDate = `${firstDate.getFullYear()}/${
      firstDate.getMonth() + 1
    }`;
  } else if (timePeriod === "year") {
    dayBeforeFirstDate = firstDate.getFullYear().toString();
  } else {
    dayBeforeFirstDate = firstDate.toLocaleDateString("vi-VN");
  }

  const lineChartData = {
    labels: [dayBeforeFirstDate, ...Object.keys(groupedOrders)],
    datasets: [
      {
        label: "Doanh thu",
        data: [0, ...Object.values(groupedOrders)],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "#001529",
        tension: 0.1,
      },
    ],
  };

  const totalRevenue = orders.reduce((acc, order) => {
    if (order.order.status === "COMPLETE") {
      return acc + order.order.totalPrice;
    } else {
      return acc;
    }
  }, 0);

  const today = new Date().toLocaleDateString("vi-VN");
  const todayRevenue = groupedOrders[today] || 0;

  const integerBestSellers = bestSellers.filter((product) =>
    Number.isInteger(product.sellQuantity)
  );

  const barChartData = {
    labels: integerBestSellers.map((product) => product.name),
    datasets: [
      {
        label: "Số lượng bán ra",
        data: integerBestSellers.map((product) => product.sellQuantity),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const columns = [
    {
      title: "Hạng",
      dataIndex: "index",
      render: (index) => {
        switch (index) {
          case 1:
            return <CrownOutlined />;
          case 2:
            return <StarOutlined />;
          case 3:
            return <TrophyOutlined />;
          default:
            return index;
        }
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Tổng tiền đã mua (VNĐ)",
      dataIndex: "totalMoney",
    },
  ];
  const data = [];
  for (let i = 1; i < bestCustomer.length + 1; i++) {
    data.push({
      index: i,
      name: bestCustomer[i - 1].name,
      totalMoney: bestCustomer[i - 1].totalMoney.toLocaleString("vi-VN"),
    });
  }

  return (
    <div className="overview">
      <div className="dataCard revenueCard">
        <h1 style={{ textAlign: "center", margin: "auto" }}>DOANH THU</h1>
        <Col span={12}>
          <Line data={lineChartData} />
          <Select
            defaultValue="day"
            style={{
              width: 120,
              display: "block",
              margin: "auto 0",
            }}
            onChange={handleTimePeriodChange}
          >
            <Option value="day">Theo ngày</Option>
            <Option value="month">Theo tháng</Option>
            <Option value="year">Theo năm</Option>
          </Select>
        </Col>
        <Col span={5} style={{ margin: "auto" }}>
          <Card title="Tổng doanh thu" bordered={false} style={{ width: 200 }}>
            <CountUp
              start={0}
              end={totalRevenue}
              duration={2.75}
              suffix=" VNĐ"
            />
          </Card>
        </Col>
        <Col span={5} offset={1} style={{ margin: "auto" }}>
          <Card
            title={`Doanh thu ${
              timePeriod === "day"
                ? "ngày"
                : timePeriod === "month"
                ? "tháng"
                : "năm"
            }`}
            bordered={false}
            style={{ width: 200 }}
          >
            {todayRevenue === 0 ? (
              "Chưa có thống kê"
            ) : (
              <CountUp
                start={0}
                end={todayRevenue}
                duration={2.75}
                suffix=" VNĐ"
              />
            )}
          </Card>
        </Col>
      </div>
      <div className="dataCard customerCard">
        <Bar
          data={barChartData}
          options={{
            animation: {
              duration: 2000,
            },
            responsiveAnimationDuration: 2000,
          }}
        />
      </div>
      <div className="dataCard categoryCard">
        <h1 style={{ textAlign: "center" }}>KHÁCH HÀNG MUA NHIỀU NHẤT</h1>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default Overview;
