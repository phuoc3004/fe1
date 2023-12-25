import { Pagination, Row, Select, Space, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/product/Product";
import SideBar from "../../components/sidebar/SideMenu";
import { getAllProduct } from "../../stores/products/product-slice";
import LoadingPage from "../loading/LoadingPage";
const Products = (props) => {
  const dispatch = useDispatch();
  const { products, loading, total } = useSelector((state) => state.products);
  // const [productSort, setProductSort] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // new line

  useEffect(() => {
    dispatch(getAllProduct({ page: currentPage - 1 })); // modified line
  }, [dispatch, currentPage]);

  // useEffect(() => {
  //   setProductSort(products);
  // }, [products]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const renderProducts = products?.map((product, index) => {
    return <Product key={product.id} product={product} />;
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onSelectedKeyHandler = (e) => {
    let sortParam = "";
    switch (e) {
      case "none":
        sortParam = "";
        break;
      case "sortAZ":
        sortParam = "name,asc";
        break;
      case "sortZA":
        sortParam = "name,desc";
        break;
      case "Decrease":
        sortParam = "price,desc";
        break;
      case "Increase":
        sortParam = "price,asc";
        break;
      default:
        break;
    }
    dispatch(getAllProduct({ page: currentPage - 1, sort: sortParam }));
  };

  return (
    <>
      <Sider
        width={"256px"}
        style={{
          background: colorBgContainer,
        }}
        className="sidebox"
      >
        <SideBar />
      </Sider>
      <Content
        style={{
          padding: "0 24px",
          minHeight: 280,
          marginTop: 30,
        }}
      >
        <Space style={{ float: "right", padding: "0px 16px" }}>
          <Select
            defaultValue="none"
            style={{
              width: 120,
            }}
            onChange={onSelectedKeyHandler}
            options={[
              {
                value: "none",
                label: "Măc định",
              },
              {
                value: "sortAZ",
                label: "Tên: A-Z",
              },
              {
                value: "sortZA",
                label: "Tên: Z-A",
              },
              {
                value: "Decrease",
                label: "Giá: Giảm dần",
              },
              {
                value: "Increase",
                label: "Giá: Tăng dần",
              },
            ]}
          />
        </Space>
        <Space style={{ marginTop: 32 }}>
          {loading ? (
            <LoadingPage />
          ) : (
            <>
              <Row gutter={16}>{renderProducts}</Row>
            </>
          )}
        </Space>
        <Row>
          <Pagination
            current={currentPage}
            pageSize={6}
            total={total}
            onChange={handlePageChange}
          />
        </Row>
      </Content>
    </>
  );
};

export default Products;
