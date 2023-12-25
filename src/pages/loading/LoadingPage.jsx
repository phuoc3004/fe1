import { Space, Spin } from "antd";
import React from "react";

const LoadingPage = () => {
  return (
    <Space
      direction="horizontal"
      style={{
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Space
        style={{
          width: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Spin tip="Loading" size="large" />
      </Space>
    </Space>
  );
};

export default LoadingPage;
