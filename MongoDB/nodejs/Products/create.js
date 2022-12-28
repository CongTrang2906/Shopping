const { default: mongoose } = require("mongoose");

const { Product } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/Test");

try {
  const data = {
    name: "Quần Short",
    price: 1200,
    stock: 120,
    discount: 30,
    categoryId: "63a181feaaae53b7137e1e21",
    supplierId: "63a7038c801f946801230928",
  };

  const newItem = new Product(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
