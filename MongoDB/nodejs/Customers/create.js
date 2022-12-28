const { default: mongoose } = require("mongoose");

const { Customer } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/Test");

try {
  const data = {
    firstName: "PHAN123",
    lastName: "NGUYEN",
    email: "congtrang2906@gmail.com",
    phoneNumber: "0329200254",
    address: "Da Nang",
    birthday: "2000-06-29",
  };

  const newItem = new Customer(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
