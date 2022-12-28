var express = require("express");
var router = express.Router();
var { write } = require("../helpers/fileHelpers");

const fileName = "./data/employees.json";
const employees = require("../data/employees.json");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send(employees);
// });

//===========================GET (params)==========================
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = employees.find((p) => {
    return p.id == id;
  });

  if (!found) {
    return res.status(404).json({ message: "employees is not found" });
  }
  res.send(found);
});

//GET (many prameter)
// router.get("/:id/:name/search/:price", function (req, res, next) {
//   const { id, name } = req.params;
//   res.send("ok");
// });

//=======================POST :tạo mới =====================================
router.post("/", function (req, res, next) {
  const data = req.body;
  console.log(" Data = ", data);
  employees.push(data);

  //write
  // Save to file
  // Tạo một file riêng xong import vào
  write(fileName, employees);

  res.status(201).json({ message: "create employees is successfull!" });
});

//============================ Patch :sửa==============================
router.patch("/:id", function (req, res, next) {
  // lấy tên lấy body để sửa
  const { id } = req.params;
  const data = req.body;
  console.log(" Data = ", data);

  //tìm data để sửa
  let found = employees.find((p) => {
    return p.id == id;
  });
  //cập nhập data gì ?
  if (found) {
    for (let x in found) {
      if (data[x]) {
        found[x] = data[x];
      }
    }
    //write
    // Save to file
    // Tạo một file riêng xong import vào
    write(fileName, employees);

    return res
      .status(200)
      .json({ message: "update employees is successfull!" });
  }
  return res.sendStatus(404);
});

//================DELETE (params)=====================================
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  const found = employees.find((p) => {
    return p.id == id;
  });

  if (!found) {
    return res.status(404).json({ message: "employees is not found" });
  }
  let remainemployees = employees.filter((p) => {
    return p.id != id;
  });

  //write
  // Save to file
  // Tạo một file riêng xong import vào
  write(fileName, remainemployees);
  res.sendStatus(200);
});

module.exports = router;
