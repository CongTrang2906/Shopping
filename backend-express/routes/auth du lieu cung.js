var express = require("express");
var router = express.Router();

var passport = require("passport");
var jwt = require("jsonwebtoken");
const jwtSettings = require("../constants/jwtSettings");

const yup = require("yup");
var { validateSchema } = require("../validations/validateSchema");

const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(3).max(31).required(),
  }),
  params: yup.object({}),
});

/* GET users listing. */
// Thêm middleware để xử lý trước khi login vào :bảo mật dữ liệu
// Kiểm tra xem thử có vé không
router.post("/login", validateSchema(loginSchema), function (req, res, next) {
  const { email, password } = req.body;

  if (email === "congtrang2906@gmail.com" && password === "123123") {
    res.send({ ok: true });
  }
  res.status(401).send({ ok: false });
});

// JWT
// Dùng trước validation
// Kiểm tra vé đã hết hạn chưa
router.post(
  "/login-jwt",
  validateSchema(loginSchema),
  function (req, res, next) {
    const { email, password } = req.body;

    if (email === "congtrang2906@gmail.com" && password === "123123") {
      // Cấp JWT
      // login: OK
      // jwt
      var payload = {
        user: {
          email: email,
          fullName: "End User",
        },
        application: "ecommerce",
      };
      var secret = jwtSettings.SECRET;
      //Payload :dữ liệu định nghĩa
      var token = jwt.sign(payload, secret, {
        expiresIn: 86400, // expires in 24 hours (24 x 60 x 60)
        audience: jwtSettings.AUDIENCE,
        issuer: jwtSettings.ISSUER,
        subject: email, // Thường dùng để kiểm tra JWT lần sau
        algorithm: "HS512",
      });
      //Lấy được token từ thằng jwt
      res.send({ ok: true, token: token });
    }
    res.status(401).send({ ok: false });
  }
);

//Router Within JWT :để bảo mật dữ liệu
router.get(
  "/jwt",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.send({ ok: true });
  }
);

module.exports = router;
