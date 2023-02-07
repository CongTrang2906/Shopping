//customer này sẽ làm mới file

var express = require("express");
var router = express.Router();
var { write } = require("../helpers/fileHelpers");

const nanoid = require("nanoid");
const fileName = "./data/customers.json";
let customers = require("../data/customers.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send(customers);
});

//=========================== GET (params)==========================
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = customers.find((p) => {
    return p.id == id;
  });

  if (!found) {
    return res.status(404).json({ message: "customers is not found" });
  }
  res.send(found);
});

//GET (many prameter)
// router.get("/:id/:name/search/:price", function (req, res, next) {
//   const { id, name } = req.params;
//   res.send("ok");
// });

//======================= POST :tạo mới =====================================
router.post("/", function (req, res, next) {
  const data = req.body;
  data.id = nanoid();
  console.log(" Data = ", data);
  customers.push(data);

  //write
  // Save to file
  // Tạo một file riêng xong import vào
  write(fileName, customers);

  res.sendStatus(201);
});

//============================ Patch :sửa==============================
router.patch("/:id", function (req, res, next) {
  // lấy tên lấy body để sửa
  const { id } = req.params;
  const data = req.body;
  console.log(" Data = ", data);

  //tìm data để sửa
  let found = customers.find((p) => {
    return p.id == id;
  });
  //cập nhập data gì ?
  if (found) {
    //cập nhập data gì ?
    for (let x in data) {
      found[x] = data[x];
    }
    //write
    // Save to file
    // Tạo một file riêng xong import vào
    write(fileName, customers);

    return res
      .status(200)
      .json({ message: "update customers is successfull!" });
  }
  return res.sendStatus(404);
});

//=======================  DELETE (params)=====================================
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = customers.find((p) => {
    return p.id == id;
  });

  if (!found) {
    return res.status(404).json({ message: "product is not found" });
  }
  let remaincustomers = customers.filter((p) => {
    return p.id != id;
  });

  //write
  // Save to file
  // Tạo một file riêng xong import vào
  customers = remaincustomers;
  write(fileName, customers);
  res.sendStatus(200);
});

module.exports = router;
