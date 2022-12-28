const { default: mongoose } = require("mongoose");

const { Category } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/Test");

try {
  const id = "63a19e599a406cd67ae0e32e";
  Category.findById(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
