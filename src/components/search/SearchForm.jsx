import { Form, Space } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect } from "react";
import "./SearchForm.scss";
import CartItemPreview from "../cart/CartItemPreview";
const SearchForm = () => {
  const [form] = Form.useForm();
  const onSearch = (value) => console.log(value);
  const item = 4;

  useEffect(() => {
    const cartContainer = document.querySelector(".search__item");
    if (item > 3) {
      cartContainer.classList.add("cart_scroll");
    } else cartContainer.classList.remove("cart_scroll");
  }, []);
  return (
    <div className="search__wrapper">
      <p className="search__title">Search</p>
      <Form form={form}>
        <Form.Item name="Search">
          <Search
            className="search__input"
            placeholder="Search..."
            onSearch={onSearch}
          />
        </Form.Item>
      </Form>
      <Space className="search__item" direction="vertical">
        <CartItemPreview />
        <CartItemPreview />
        <CartItemPreview />
        <CartItemPreview />
      </Space>
    </div>
  );
};

export default SearchForm;
