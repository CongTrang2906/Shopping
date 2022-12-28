import React from "react";
import axios from "axios";
import numeral from "numeral";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Popconfirm,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
export default function ProductPage() {
  const [refresh, setRefresh] = React.useState(0);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [products, setproducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);

  //colums of Antd Table
  const columns = [
    {
      title: "TT",
      key: "no",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{index + 1}</span>
          </div>
        );
      },
    },
    {
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Danh mục</div>;
      },
      dataIndex: "category",
      key: "category",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>{record.category.name}</span>
          </div>
        );
      },
    },
    {
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Nhà cung cấp</div>;
      },
      dataIndex: "supplier",
      key: "supplier",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>{record.supplier.name}</span>
          </div>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      dataIndex: "name",
      render: (text, record, index) => {
        return (
          <div>
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{numeral(text).format("0,0$")}</span>
          </div>
        );
      },
    },
    {
      title: "Giảm",
      dataIndex: "discount",
      key: "discount",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{numeral(text).format("0,0")}%</span>
          </div>
        );
      },
    },
    {
      title: "Tồn",
      dataIndex: "stock",
      key: "stock",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{numeral(text).format("0,0")}</span>
          </div>
        );
      },
    },
    // =================btn DELETE -UPDATE====================
    {
      title: "",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => selectProduct(record)}
            />
            <Popconfirm
              title="Are you sure to delete?"
              okText="Đồng ý"
              cancelText="Đóng"
              onConfirm={() => {
                deleteProduct(record._id);
              }}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/suppliers").then((response) => {
      setSuppliers(response.data);
      //console.log(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/categories").then((response) => {
      setCategories(response.data);
      //console.log(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/products").then((response) => {
      setproducts(response.data);
      //console.log(response.data);
    });
  }, [refresh]);

  //======================Create Form ==========================
  const onFinish = (values) => {
    //values chính là body
    console.log(values);
    //Code here
    //CALL API TO CREATE Product
    axios.post("http://localhost:9000/products", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
      console.log(response.data);
    });
  };

  //====================== Edit =================================
  const onEditFinish = (values) => {
    //values chính là body
    console.log(values);
    //Code here
    //CALL API TO CREATE Product
    axios
      .patch("http://localhost:9000/products/" + selectedProduct.id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  //==================== SELECT TO UPDATE ===================
  const selectProduct = (data) => {
    setEditModalVisible(true);
    setSelectedProduct(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  // ===================DELETE================================
  const deleteProduct = (id) => {
    axios.delete("http://localhost:9000/products/" + id).then((response) => {
      console.log(response);
      setRefresh((f) => f + 1);
    });
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
    <div>
      {/* ======================= CREATE -FORM========================== */}
      <Form
        form={createForm}
        name="create-product"
        style={{ width: "80%" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        {/* ==============Danh mục================== */}
        <Form.Item
          label="Danh mục"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Please input your product categories!",
            },
          ]}
        >
          <Select
            options={
              categories &&
              categories.map((c) => {
                return {
                  value: c._id,
                  label: c.name,
                };
              })
            }
          />
        </Form.Item>

        {/* =======================Nhà cung cấp =================== */}
        <Form.Item
          label="Nhà cung cấp"
          name="supplierId"
          rules={[
            { required: true, message: "Please input your product supplier!" },
          ]}
        >
          <Select
            options={
              suppliers &&
              suppliers.map((c) => {
                return {
                  value: c._id,
                  label: c.name,
                };
              })
            }
          />
        </Form.Item>
        {/*============== Tên Product================ */}
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Please input your product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        {/*================ Gía bán ==============*/}
        <Form.Item
          label="Giá bán"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <InputNumber />
        </Form.Item>

        {/*================ Discount=================== */}
        <Form.Item
          label="Giảm giá (%)"
          name="discount"
          rules={[{ required: true, message: "Please input your discount!" }]}
        >
          <InputNumber />
        </Form.Item>
        {/* ==============Stock=====================*/}
        <Form.Item
          label="Tồn"
          name="stock"
          rules={[{ required: true, message: "Please input your Stock!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        {/* SUBMIT */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
      {/* ====================================TABLE (UPDATE)================================ */}
      <Table
        rowKey="id"
        dataSource={products}
        columns={columns}
        pagination={false}
      />
      {/* ==============================MODEL============================== */}
      <Modal
        open={editModalVisible}
        title="cập nhập thông tin "
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Close"
        okText="Save"
        onOk={() => {
          updateForm.submit();
        }}
      >
        <Form
          form={updateForm}
          name="update-products"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onEditFinish}
        >
          {/*====================  NAME ==================*/}
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              { required: true, message: "Please input your product name!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/*================ Gía bán ==============*/}
          <Form.Item
            label="Giá bán"
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <InputNumber />
          </Form.Item>

          {/*================ Discount=================== */}
          <Form.Item
            label="Giảm giá (%)"
            name="discount"
            rules={[{ required: true, message: "Please input your discount!" }]}
          >
            <InputNumber />
          </Form.Item>
          {/* ==============Stock=====================*/}
          <Form.Item
            label="Tồn"
            name="stock"
            rules={[{ required: true, message: "Please input your Stock!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
