import React, { useState, useEffect } from "react";
import "./App.css";
import { Table, Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

function App() {
  const [productList, setProductList] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }, []);

  useEffect(() => {
    if (cartCount > 0 && cartCount % 5 === 0) {
      alert("Selamat anda mendapatkan diskon 100%");
    }
  }, [cartCount]);

  const cart = "Cart";

  const handleAddToCart = (productId) => {
    setCartCount((prevCount) => prevCount + 1);
    console.log(`Added Product ${productId}`);
    openNotification();
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
        <Button type="primary" onClick={() => handleAddToCart(id)}>
          Add to Cart
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
