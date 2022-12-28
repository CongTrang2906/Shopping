const { default: mongoose } = require("mongoose");

const { Order } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/Test");

try {
  const data = {
    createdDate: "2022-11-15",
    shippedDate: "2022-11-20",
    status: "WAITING",
    description: "Dang qua trinh van chuyen",
    shippingAddress: "HUE",
    paymentType: "CASH",
    customerId: "63a6f546d605e1717317fe4e",
    employeeId: "63a71076e51b0591f6c1c988",
  };

  const newItem = new Order(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
