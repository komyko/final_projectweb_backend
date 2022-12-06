const bcrypt = require("bcryptjs");
const Users = require("../models/user-schema");
const jwt = require("../jwt");

exports.register = async (req, res) => {
  const usernameExist = await Users.findOne({ user_id: req.body.user_id });
  if (usernameExist)
    return res
      .status(200)
      .json({ result: "nOK", message: "Username already exists", data: {} });

  const emailExist = await Users.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(200)
      .json({ result: "nOK", message: "Email already exists", data: {} });

  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);

    const data = await Users.create(req.body);

    const userSchema = {
      user_id: data.user_id,
      name: data.name,
      email: data.email,
      tel: data.tel,
    };

    res
      .status(200)
      .json({
        result: "OK",
        message: "success create account",
        data: userSchema,
      });
  } catch (e) {
    res
      .status(500)
      .json({ result: "Internal Server Error", message: "", data: {} });
  }
};

exports.login = async (req, res) => {
  try {
    const { user_id, password } = req.body;

    const data = await Users.findOne({ user_id: user_id });

    if (data) {
      const isPasswordValid = await bcrypt.compare(password, data.password);
      if (isPasswordValid) {
        const userSchema = {
          user_id: data.user_id,
          email: data.email,
          name: data.name,
          tel: data.tel,
        };

        const token = jwt.sign(userSchema);

        res
          .status(200)
          .header("Authorization", `Bearer ${token}`)
          .json({ result: "OK", message: "success sign in", data: userSchema });
      } else {
        res
          .status(200)
          .json({
            result: "nOK",
            message: "invalid username or password",
            data: {},
          });
      }
    } else {
      res
        .status(200)
        .json({
          result: "nOK",
          message: "invalid username or password",
          data: {},
        });
    }
  } catch (e) {
    res
      .status(500)
      .json({ result: "Internal Server Error", message: "", data: {} });
  }
};
