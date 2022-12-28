const { default: mongoose } = require("mongoose");

const { Supplier } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/Test");

try {
  const data = {
    name: "TRANG",
    email: "congtrang2906@gmail.com",
    phoneNumber: "0329200254",
    address: "Da Nang",
  };

  const newItem = new Supplier(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
