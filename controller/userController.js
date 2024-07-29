const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = db.users;
const Delivery_detail = db.delivery_details;

const login = async (req, res) => {
  const { email, password } = req.body;
  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("ERROR", err);
    }
  );
  if (!userWithEmail) {
    return res.status(401).json({ message: "Email or password not match" });
  }
  try {
    const isPasswordMatch = await bcrypt.compare(
      password,
      userWithEmail.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Email or password not match" });
    }
    const jwtToken = jwt.sign(
      { id: userWithEmail.user_id, email: userWithEmail.email },
      "secrettoken"
    );
    res.status(200).json({ message: "Login Success", token: jwtToken });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, dob, email, userName, password } = req.body;
  const hashPass = bcrypt.hashSync(password, 10);
  console.log(hashPass);
  const isAlreadyUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("ERROR", err);
    }
  );
  if (isAlreadyUser) {
    return res.json({ status: "error", error: "Email is already exists" });
  }
  const newUser = new User({
    firstName,
    lastName,
    dob,
    email,
    userName,
    password: hashPass,
  });

  const savedUser = await newUser.save().catch((err) => {
    res.status(401).json({ message: "Can not register a user" });
  });
  if (savedUser) {
    return res.status(200).json({ message: "Register Success" });
  }
};

const getDelivery_detail = async (req, res) => {
  try {
    const { user } = req;
    const data = await User.findOne({
      include: [
        {
          model: Delivery_detail,
          as: "delivery_detail",
        },
      ],
      where: { user_id: user.user_id },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
const deleteDelivery_detail = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    // Fetch the delivery detail to check ownership
    const deliveryDetail = await Delivery_detail.findOne({
      where: { delivery_id: id },
    });

    if (!deliveryDetail) {
      return res.status(404).json({ message: "Delivery detail not found" });
    }

    // Check if the delivery detail belongs to the user
    if (deliveryDetail.user_id !== user.user_id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this delivery detail" });
    }

    // Proceed with deletion
    await Delivery_detail.destroy({
      where: { delivery_id:id },
    });

    res.status(200).json({ message: "Delivery detail deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUserData = async (req, res) => {
  const { user } = req;
  try {
    const result = await User.findOne({ where: user.user_id });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
const updateUserData = async (req, res) => {
  const { user } = req;
  const userId = user.user_id;
  const updatedData = req.body;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update(updatedData);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Error updating user" });
  }
};

const addDelivery_detail = async (req, res) => {
  const data = {
    del_village: req.body.village,
    del_district: req.body.district,
    del_province: req.body.province,
    del_phone: req.body.phone,
    user_id: req.user.user_id,
  };
  try {
    const result = await Delivery_detail.create(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

module.exports = {
  login,
  register,
  getDelivery_detail,
  addDelivery_detail,
  getUserData,
  updateUserData,
  deleteDelivery_detail,
};
