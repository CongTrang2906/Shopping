import React from "react";
import axios from "axios";
import { Button, Form, Input, Modal, Space, Table } from "antd";
export default function CustomerPage() {
  // Call api
  // React.useEffect(() => {
  //   fetch("http://localhost:9000/customers")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       console.log(json);
  //     });
  // }, []);
  const [refresh, setRefresh] = React.useState(0);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [customers, setCustomers] = React.useState([]);

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
    // {
    //   title: "FirstName",
    //   dataIndex: "firstName",
    //   key: "firstName",
    // },
    // {
    //   title: "LastName",
    //   dataIndex: "lastName",
    //   key: "lastName",
    // },
    {
      title: "FullName",
      key: "fullName",
      render: (text, record, index) => {
        return (
          <div>
            <span>
              {record.firstName} {record.lastName}
            </span>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SDT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "BIRTHDAY",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button onClick={() => selectCustomer(record)}>Update</Button>
            <Button onClick={() => deleteCustomer(record.id)}>Delete</Button>
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/customers").then((response) => {
      setCustomers(response.data);
      //console.log(response.data);
    });
  }, [refresh]);

  //======================Create Form ==========================
  const onFinish = (values) => {
    //values chính là body
    console.log(values);
    //Code here
    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/customers", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        //giá trị cũ cộng thêm cho 1
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
    //CALL API TO CREATE CUSTOMER
    axios
      .patch("http://localhost:9000/customers/" + selectedCustomer.id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  //==================== SELECT TO UPDATE =========================
  const selectCustomer = (data) => {
    setEditModalVisible(true);
    setSelectedCustomer(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  // ===================DELETE======================================
  const deleteCustomer = (id) => {
    axios.delete("http://localhost:9000/customers/" + id).then((response) => {
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
        name="create-customers"
        style={{ width: "80%" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        {/*============== FIRST NAME================ */}
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        {/*================ LAST NAME ==============*/}
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

        {/*================ EMAIL=================== */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input your valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        {/* ==============SDT=====================*/}
        <Form.Item
          label="SDT"
          name="phoneNumber"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        {/* ==============ADRESS================== */}
        <Form.Item
          label="ADDRESS"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        {/* ==============BIRTHDAY================== */}
        <Form.Item
          label="BIRTHDAY"
          name="birthday"
          rules={[{ required: true, message: "Please input your birthday!" }]}
        >
          <Input />
        </Form.Item>

        {/* SUBMIT */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Customer
          </Button>
        </Form.Item>
      </Form>
      {/* ====================================TABLE================================ */}
      <Table
        rowKey="id"
        dataSource={customers}
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
          name="update-customers"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onEditFinish}
        >
          {/*==================== FIRST NAME ==================*/}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/*======================= LAST NAME================= */}
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/*======================== EMAIL==================== */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please input your valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* ========================SDT====================== */}
          <Form.Item
            label="SDT"
            name="phoneNumber"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          {/* ========================ADDRESS====================== */}
          <Form.Item
            label="ADDRESS"
            name="address"
            rules={[{ required: true, message: "Please input your address" }]}
          >
            <Input />
          </Form.Item>
          {/* ========================BIRTHDAY====================== */}
          <Form.Item
            label="BIRTHDAY"
            name="birthday"
            rules={[{ required: true, message: "Please input your birthday" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
