import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  ColorPicker,
  Image,
  message,
} from "antd";
import axios from "axios";
import { addProduct, getAllCategories } from "../../../api/products";
import chroma from "chroma-js";

const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};

const AddProduct = () => {
  const formRef = useRef(null);

  const standardSizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];
  const [componentSize, setComponentSize] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dqhmlpfn2/image/upload",
      data
    );
    const file = res.data;
    setImage(file.secure_url);
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getAllCategories();
      const data = response;
      setCategory(data);
    };
    fetchCategory();
  }, []);

  const [request, setRequest] = useState({
    name: "",
    categoryId: "",
    size: "",
    color: "",
    price: "",
    discount: "",
    quantity: "",
    description: "",
    image: "",
  });

  console.log(request);

  const onFinish = async (values) => {
    if (
      image === "" ||
      values.size === "" ||
      values.categoryId === "" ||
      values.name === "" ||
      values.price === "" ||
      values.quantity === "" ||
      values.color === undefined
    ) {
      messageApi.error("Vui lòng điền đủ thông tin sản phẩm");
      return;
    }
    let hexColor;
    if (values.color.metaColor.format === "name") {
      hexColor = values.color.metaColor.originalInput;
    } else {
      const color = chroma(
        values.color.metaColor.r,
        values.color.metaColor.g,
        values.color.metaColor.b
      );
      hexColor = color.hex();
    }
    console.log(values.color);
    setRequest({
      name: values.name,
      categoryId: values.categoryId,
      size: values.size,
      color: hexColor,
      price: values.price,
      discount: "",
      quantity: values.quantity,
      description: values.description,
      imageUrl: image,
    });
    const newRequest = {
      name: values.name,
      categoryId: values.categoryId,
      size: values.size,
      color: hexColor,
      price: values.price,
      discount: "",
      quantity: values.quantity,
      description: values.description,
      imageUrl: image,
    };
    try {
      const response = await addProduct(newRequest);
      messageApi.success("Thêm thành công");
      console.log(response);
    } catch (error) {
      messageApi.error("Thêm sản phẩm thất bại");
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        ref={formRef}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        onFinish={onFinish}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Form Size" value="large" hidden></Form.Item>
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phân loại"
          name="categoryId"
          rules={[{ required: true, message: "Vui lòng chọn loại hàng!" }]}
        >
          <Select>
            {category.map((c) => (
              <Select.Option key={c.id} value={c.id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Kích cỡ"
          name="size"
          rules={[{ required: true, message: "Vui lòng chọn size!" }]}
        >
          <Select>
            {standardSizeOrder.map((size) => (
              <Select.Option key={size} value={size}>
                {size}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Màu"
          name="color"
          rules={[{ required: true, message: "Vui lòng chọn màu!" }]}
        >
          <ColorPicker
            presets={[
              {
                label: "Recommended",
                colors: [
                  "YELLOW",
                  "RED",
                  "BLUE",
                  "GREEN",
                  "PURPLE",
                  "BLACK",
                  "WHITE",
                  "ORANGE",
                  "PINK",
                  "BROWN",
                  "GRAY",
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Giá tiền"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <TextArea
            showCount
            maxLength={100}
            onChange={onChange}
            placeholder="Nhập mô tả"
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <div>
            <Input
              type="file"
              name="file"
              placeholder="Tải hình ảnh"
              onChange={uploadImage}
              style={{
                border: "none",
              }}
              required
            />
          </div>
          {image && (
            <Image src={image} style={{ width: 300, height: "auto" }} />
          )}
        </Form.Item>
        <Form.Item label="">
          <Button type="primary" htmlType="submit">
            Thêm sản phẩm
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 30 }}
            onClick={() => {
              formRef.current.resetFields();
              setImage("");
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;
