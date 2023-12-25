import {
  CheckCircleFilled,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { notification, Col, Form, Image, InputNumber, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetail } from "../../stores/products/product-slice";
import "./Detail.scss";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../stores/cart/cart-slice";
import { addCartItem } from "../../api/carts";
// import { addToCart } from "../../stores/cart/cart-slice";
import { getToken } from "../../api/users";
const Detail = (props) => {
  const { idProduct } = useParams();
  const [productCurrent, setProductCurrent] = useState();
  // const [mainImage, setMainImage] = useState();
  // const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const standardSizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

  const [availableSizes, setAvailableSizes] = useState();
  const [availableColors, setAvailableColors] = useState();

  const [quantity, setQuantity] = useState(1);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productDetail } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProductDetail(idProduct));
  }, [dispatch, idProduct]);
  console.log(productDetail);
  useEffect(() => {
    setProductCurrent(productDetail);
    if (
      !productCurrent ||
      !productCurrent.product ||
      !productCurrent.productVariants
    ) {
      setAvailableSizes([]);
      setAvailableColors([]);
    } else {
      const variants = productCurrent.productVariants.filter(
        (variant) => variant.quantity > 0
      );
      setAvailableSizes(variants.map((variant) => variant.size));
      setAvailableColors(variants.map((variant) => variant.color));
    }
  }, [productDetail, productCurrent]);

  useEffect(() => {
    console.log(color);
  }, [color]);

  const onSizeSelectHandler = (e, selectedSize) => {
    const newSelectedSize = e.target.innerHTML.toString();
    // setSize(newSelectedSize);
    setSelectedSize(newSelectedSize);
  };

  const onColorSelectHandler = (e, selectedColor) => {
    const newSelectedColor = e.target.innerHTML.toString();
    setColor(newSelectedColor);
    setSelectedColor(newSelectedColor);
  };

  const addToCartHandler = async () => {
    if (getToken() === null) {
      notification.error({
        message: "Error",
        description: "Please login to add cart item",
        placement: "top",
        duration: 1,
      });
      return;
    }
    if (!selectedSize || !selectedColor) {
      notification.error({
        message: "Error",
        description: "Please select size and color before adding to cart",
        placement: "top",
        duration: 1,
      });
      return;
    }

    const item = {
      productId: productCurrent?.product.id,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    try {
      const response = await addCartItem(item);
      const message = response.message;
      console.log(message);
      if (message === "Sản phẩm tạm thời hết hàng") {
        notification.warning({
          message: "Warning",
          description: "Sản phẩm tạm thời hết hàng",
          placement: "top",
          duration: 3,
        });
        return;
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
    notification.success({
      message: "Success",
      description: "Item added to cart successfully!",
      duration: 1,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const changeQuantityHandler = (e) => {
    setQuantity(e);
  };
  // const renderImage = product?.images.map((image, index) => {
  //   return (
  //     <Space
  //       className={image === mainImage ? "clothes__selected" : ""}
  //       key={index}
  //     >
  //       <Image
  //         preview={false}
  //         width={64}
  //         src={image}
  //         onClick={() => setMainImage(image)}
  //         style={{ cursor: "pointer" }}
  //       />
  //     </Space>
  //   );
  // });

  const isSizeAvailable = (size) => {
    return Array.isArray(availableSizes) && availableSizes.includes(size);
  };
  const isColorAvailable = (color) => {
    return Array.isArray(availableColors) && availableColors.includes(color);
  };

  const renderSizeOptions = (productVariants, onSizeSelectHandler) => {
    const uniqueSizes =
      productVariants?.length > 0
        ? Array.from(
            new Set(
              productVariants
                .filter((variant) => variant.quantity >= 0)
                .map((variant) => variant.size)
            )
          )
        : [];

    const sortedSizes = uniqueSizes.sort((a, b) => {
      const indexOfA = standardSizeOrder.indexOf(a);
      const indexOfB = standardSizeOrder.indexOf(b);

      if (indexOfA === -1) return 1; // Move items not in the standard order to the end
      if (indexOfB === -1) return -1; // Move items not in the standard order to the end

      return indexOfA - indexOfB;
    });

    return (
      (sortedSizes?.length > 0 &&
        sortedSizes.map((size, index) => (
          <div
            key={index}
            className={`size__option ${
              isSizeAvailable(size) ? "" : "out-of-stock"
            } ${selectedSize === size ? "selected-size" : ""}`}
            onClick={(e) => onSizeSelectHandler(e, size)}
          >
            {size}
          </div>
        ))) ||
      []
    );
  };
  const renderColorOptions = (productVariants, onColorSelectHandler) => {
    const uniqueColors =
      productVariants?.length > 0
        ? Array.from(
            new Set(
              productVariants
                .filter((variant) => variant.quantity > 0)
                .map((variant) => variant.color)
            )
          )
        : [];

    return (
      (uniqueColors?.length > 0 &&
        uniqueColors.map((color, index) => (
          <button
            key={index}
            className={`color__option ${
              isColorAvailable(color) ? "" : "out-of-stock"
            } ${color === selectedColor ? "active" : ""}`}
            onClick={(e) => onColorSelectHandler(e, color)}
            style={{ backgroundColor: color, color: color }}
          >
            {/* {color === selectedColor && (
              <CheckCircleFilled className="color-icon" />
            )} */}
            {selectedColor === color && (
              <CheckCircleFilled className="color-icon" />
            )}
            {color}
          </button>
        ))) ||
      []
    );
  };

  const buyNowHandler = () => {
    if (getToken() === null) {
      notification.error({
        message: "Error",
        description: "Please login to buy now",
        placement: "top",
        duration: 1,
      });
      return;
    }
    if (!selectedSize || !selectedColor) {
      notification.error({
        message: "Error",
        description: "Please select size and color before buying",
        placement: "top",
        duration: 1,
      });
      return;
    }
    const item = {
      productId: productCurrent?.product.id,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      product: productCurrent,
    };
    localStorage.setItem("item", JSON.stringify(item));
    navigate("/checkouts");
  };

  return (
    <Row gutter={16} style={{ marginTop: 64 }}>
      {/* <Col md={4} style={{ position: "relative" }}>
        <Space className="image__box">
          <Image width={64} src={renderImage} />
        </Space>
      </Col> */}
      <Col md={10} style={{ position: "relative" }}>
        <Space className="image__main">
          <Image
            height={600}
            src={productCurrent?.product?.image}
            preview={false}
          />
        </Space>
      </Col>
      <Col md={10} style={{ position: "relative" }}>
        <Space className="product__information" direction="vertical">
          <div className="product__name ">
            {productCurrent?.product.name.toUpperCase()}
          </div>
          <div className="product__id border-bot-dashed">
            ID: {productCurrent?.product.id}
          </div>
          <div>Description:</div>
          <div className="product__description border-bot-dashed">
            {productCurrent?.product.description}
          </div>
          <div>Price:</div>
          <div className="product__price border-bot-dashed">
            {productCurrent?.product.price} VNĐ
          </div>
          <div>Size:</div>
          <Space className="product__size border-bot-dashed">
            {renderSizeOptions(productCurrent?.productVariants, (e, size) =>
              onSizeSelectHandler(e, size)
            )}
          </Space>
          <div>Color:</div>
          <Space className="product__color border-bot-dashed">
            {renderColorOptions(
              productCurrent?.productVariants,
              onColorSelectHandler
            )}
            <div>Color: {color.toUpperCase()}</div>
          </Space>
          <div>Quantity:</div>
          <Space.Compact className="product__quantity border-bot-dashed" block>
            <Form form={form}>
              <InputNumber
                min={1}
                keyboard={true}
                defaultValue={1}
                controls={{
                  upIcon: <PlusOutlined />,
                  downIcon: <MinusOutlined />,
                }}
                size="large"
                onChange={changeQuantityHandler}
                className="inputNumber"
              />
            </Form>
          </Space.Compact>
          <Space className="btn">
            <div className="btn__cart btn__normal" onClick={addToCartHandler}>
              Add to cart
            </div>
            <div className="btn__buy btn__normal" onClick={buyNowHandler}>
              Buy now
            </div>
          </Space>
        </Space>
      </Col>
    </Row>
  );
};

export default Detail;
