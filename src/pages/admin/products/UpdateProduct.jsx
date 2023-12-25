import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Input, Select, Image, message } from "antd";
import axios from "axios";
import { getAllCategories, updateProduct } from "../../../api/products";
import moment from "moment";

const { TextArea } = Input;
const onChange = (e) => {
  // console.log("Change:", e.target.value);
};

const UpdateProduct = (props) => {
  console.log(props);
  const formRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [componentSize, setComponentSize] = useState("");

  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const [originalImage, setOriginalImage] = useState("");

  useEffect(() => {
    setProduct(props.product);
    setImage(props.product?.image);
    setOriginalImage(props.product?.image);
  }, [props.product]);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
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
    productId: "",
    name: "",
    categoryId: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const onFinish = async (values) => {
    setRequest({
      name: values.name,
      categoryId: values.categoryId,
      price: values.price,
      description: values.description,
      imageUrl: image,
    });
    console.log(request);
    const newRequest = {
      categoryId: values.categoryId,
      price: values.price,
      description: values.description,
      imageUrl: image,
    };
    console.log(newRequest);
    try {
      const response = await updateProduct(props.product?.id, newRequest);
      console.log(response);
      messageApi.success("Chỉnh sửa thành công");
      window.location.reload();
    } catch (error) {
      console.log(error);
      messageApi.error("Chỉnh sửa thất bại");
    }
  };

  return (
    <>
      {contextHolder}
      {product && (
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
            name: product?.name,
            categoryId: product?.categoryId,
            category: product?.category.name,
            price: product?.price,
            description: product?.description,
            image: product?.image,
          }}
          onValuesChange={onFormLayoutChange}
          onFinish={onFinish}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Form Size" value="large" hidden></Form.Item>
          <Form.Item label="Ngày thêm" name="date">
            {moment(product?.updateDate).format("HH:mm:ss DD/MM/YYYY")}
          </Form.Item>
          <Form.Item label="Tên" name="name">
            <Input value={product?.name} />
          </Form.Item>
          <Form.Item
            label="Phân loại"
            name="categoryId"
            initialValue={product?.category?.id}
          >
            <Select>
              {category.map((c) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Giá tiền" name="price">
            <Input />
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
              />
            </div>
            {image && (
              <Image src={image} style={{ width: 300, height: "auto" }} />
            )}
          </Form.Item>
          <Form.Item label="">
            <Button type="primary" htmlType="submit">
              Chỉnh sửa
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: 30 }}
              onClick={() => {
                formRef.current.resetFields();
                setImage(originalImage);
              }}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default UpdateProduct;
