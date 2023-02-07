const { CONNECTION_STRING } = require("../constants/dbSettings");
const { default: mongoose } = require("mongoose");
const { Product } = require("../models");

//Add validation to middleware: kiểm soát dữ liệu đầu vào
const yup = require("yup");
var { validateSchema } = require("../validations/validateSchema");

// MONGOOSE
// mongoose.connect("mongodb://127.0.0.1:27017/Test");
mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_STRING);

var express = require("express");
var router = express.Router();

// GET
router.get("/", function (req, res, next) {
  try {
    Product.find()
      // hiển thị category_supplier
      .populate("category")
      .populate("supplier")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// GET:id
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Product.findById(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// POST
router.post("/", function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Product(data);
    newItem
      .save()
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// PATCH/:id
router.patch("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    Product.findByIdAndUpdate(id, data, {
      new: true,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.sendStatus(500);
  }
});

// DELETE
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Product.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//Question1
// GET ---Truy vấn dữ liệu
// Hiển thị tất cả mặt hàng có giảm giá <=10%
// https://www.mongodb.com/docs/manual/reference/operator/query/

// Validation
// Add validation to middleware
// dữ liệu đầu vào được chặt chẽ
const question1Schema = yup.object({
  query: yup.object({
    discount: yup.number().integer().min(0).max(100).required(),
  }),
});
// Ông question1 muốn vô dc function thì phải qua validation ở trên
router.get(
  "/questions/1",
  validateSchema(question1Schema),
  function (req, res, next) {
    try {
      //điều kiện
      let discount = req.query.discount;
      let query = { discount: { $lte: discount } };
      Product.find(query)
        .populate("category")
        .populate("supplier")
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.status(400).send({ message: err.message });
        });
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

//Question 1b
// Hiển thị tất cả mặt hàng có giảm giá <=10% và chi tiết danh mục nhà cung cấp
// https://www.mongodb.com/docs/manual/reference/operator/query/
router.get("/questions/1b", function (req, res, next) {
  try {
    //điều kiện
    let query = { discount: { $lte: 10 } };
    Product.find(query)
      .populate("category")
      .populate("supplier")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//Question2
// GET ---Truy vấn dữ liệu
// Hiển thị tất cả mặt hàng có giảm giá <=10%
// https://www.mongodb.com/docs/manual/reference/operator/query/
router.get("/questions/2", function (req, res, next) {
  try {
    //điều kiện
    let stock = req.query.stock;
    let query = { stock: { $lte: stock } };
    Product.find(query)
      .populate("category")
      .populate("supplier")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//Question 3 :
//Hiển thị tất cả mặt hàng có giá bán sau khi giảm giá <=100.000
router.get("/questions/3", async (req, res, next) => {
  try {
    // let finalPrice = price * (100 - discount) / 100;
    const s = { $subtract: [100, "$discount"] }; // (100 - 5) (100-discount)
    const m = { $multiply: ["$price", s] }; // price * 95
    const d = { $divide: [m, 100] }; // price * 95 / 100
    //điều kiện
    let aggregate = [{ $match: { $expr: { $lte: [d, 100000] } } }];
    Product.aggregate(aggregate)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
