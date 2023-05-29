const USER = require("../Models/AuthSchema");

const SignUpUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, phone, profilePicture, selectedCountry } = req.body;
    let CREATION_DATA = {
      name: name,
      phone: phone,
      selectedCountry: selectedCountry,
    };
    const userExist = await USER.findOne({ phone: phone });
    if (userExist)
      return res.json({ success: true, error: "Previouse user signin" });
    if (profilePicture) CREATION_DATA.profilePicture = profilePicture;
    const createUser = await USER(CREATION_DATA);
    await createUser.save();
    console.log(req.body);

    res.json({
      success: true,
      message: "Signup successful",
      data: CREATION_DATA,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Getting All Registered Users
const getAllUsers = async (req, res) => {
  try {
    const users = await USER.find({}).sort({ _id: -1 });
    res.json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve users",
    });
  }
};

// OTP Verification

const OtpVerification = async (req, res) => {
  try {
    const { otp, userID } = req.body;
    console.log(req.body);
    const PreUser = await USER.findById({ _id: userID });

    if (!PreUser)
      return res
        .status(400)
        .json({ success: false, error: "Something went wrong user not found" });
    if (otp == "123456") {
      res.status(200).json({
        success: true,
        message: "Verification success",
        data: PreUser,
      });
    } else {
      res.status(200).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: "Something went wrong Invalid user" });
    console.log(error.message);
  }
};

// Login User

const LoginUser = async (req, res) => {
  try {
    const { phone } = req.body;
    const resp = await USER.findOne({ phone: phone });
    if (!resp)
      return res.json({
        success: false,
        message: "User Not Verified or Found",
      });
    res.json({ success: true, message: "user found success", data: resp });
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  SignUpUser,
  getAllUsers,
  OtpVerification,
  LoginUser,
};
