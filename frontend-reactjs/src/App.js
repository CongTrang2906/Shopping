import React from "react";
import { Button, Layout, Row } from "antd";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "antd/dist/reset.css";
import numeral from "numeral";
import "numeral/locales/vi";
import "./App.css";

import HomePage from "./pages/HomePage";
import MainMenu from "./components/MainMenu";
import NotFoundPage from "./pages/NotFoundPage";
import CustomerPage from "./pages/Management/CustomerPage";
import ProductPage from "./pages/Management/ProductPage";
import DiscountPage from "./pages/Sales/Products/DiscountPage";
import StockPage from "./pages/Sales/Products/StockPage";

numeral.locale("vi");
const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Sider theme="dark" style={{ minHeight: "100vh" }}>
            <MainMenu />
          </Sider>
          <Layout>
            <Header style={{ background: "#1E90FF" }}>
              <h1 style={{ color: "white" }}>Online Shop - Master</h1>
            </Header>

            <Content style={{ padding: 0 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />

                {/* Management */}
                <Route path="home" element={<HomePage />} />
                <Route path="/management/products" element={<ProductPage />} />
                <Route
                  path="/management/customers"
                  element={<CustomerPage />}
                />

                {/* Sale */}
                <Route
                  path="/sales/products/discount"
                  element={<DiscountPage />}
                />
                <Route path="/sales/products/stock" element={<StockPage />} />

                {/* NO MATCH ROUTE */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
