import React, { useState, useEffect } from "react";
import "./App.css";
import { Table, Button, notification, Alert } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Marquee from "react-fast-marquee";

function App() {
  const [productList, setProductList] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const [loadingBtns, setLoadingBtns] = useState({});

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);

  useEffect(() => {
    if (cartCount > 0 && cartCount % 5 === 0) {
      discountNotification();
    }
  }, [cartCount]);

  const cart = "Cart";

  const handleAddToCart = (productId) => {
    setLoadingBtns((prevLoadingBtns) => ({
      ...prevLoadingBtns,
      [productId]: true,
    }));

    setTimeout(() => {
      setLoadingBtns((prevLoadingBtns) => ({
        ...prevLoadingBtns,
        [productId]: false,
      }));
      setCartCount((prevCount) => prevCount + 1);
      openNotification();
      console.log(`Added ${productId}`);
    }, 1000);
  };

  const openNotification = () => {
    api.open({
      message: "Item Added to Cart",
      description: "The item has been successfully added to your cart.",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };

  const discountNotification = () => {
    notification.open({
      message: "Congratulations!",
      description: (
        <Alert
          message="Informational Notes"
          description={
            <Marquee pauseOnHover>
              SELAMAT ANDA MENDAPATKAN DISKON SEBESAR 100%
            </Marquee>
          }
          type="info"
          showIcon
        />
      ),
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="product" style={{ width: 50 }} />
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <>
          <div>Rate: {rating.rate}</div>
          <div>Count: {rating.count}</div>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Button
          type="primary"
          onClick={() => handleAddToCart(id)}
          loading={loadingBtns[id]}
        >
          {loadingBtns[id] ? "Adding..." : "Add to Cart"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <div>Toko Om Jaya</div>
      <Table dataSource={productList} columns={columns} />
      <div>
        {cart} {cartCount}
      </div>
      {contextHolder}
    </>
  );
}

export default App;
