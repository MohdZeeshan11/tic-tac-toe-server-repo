const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  const user = await User.find({});
  res.status(200).json({ success: true, message: "hello" });
};

const userRegister = async (req, res) => {
  const { name, userName, email, password } = req.body;
  // console.log(req.body);
  if (!userName || !email || !password || !name) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExit = await User.findOne({ email });
  //   const userExit = await User.findOne({ $and: [{email:email},{userName:userName}] });
  if (userExit) {
    res.status(200).json({ success: false, error: "user already registered" });
  }
  //hassword password
  const hasswordPassword = await bcrypt.hash(password, 10);
  // console.log(hasswordPassword)
  const user = await User.create({
    name,
    userName,
    email,
    password: hasswordPassword,
  });

  if (user) {
    res
      .status(200)
      .json({
        success: true,
        _id: user.id,
        email: user.email,
        userName: user.userName,
      });
  } else {
    res
      .status(400)
      .json({ success: "false", errorMsg: "User data is not valid" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "email and password required" });
  }
  const user = await User.findOne({ email });
  // compare  password with hashpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          name: user.name,
          id: user.id,
        },
      },
      process.env.JWT_SIGNING_KEY,
    // "12347362shd",
      { expiresIn: "30d" }
    );
    res.status(200).json({ success: true,user ,accessToken });
  } else {
    res
      .status(400)
      .json({ success: "false", error: "userName or password is not valid" });
  }
};

// const singlePlayer = async (req,res)=>{
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     res.status(200).json({ success: true, playerName: user.userName,id:user._id });
//   } catch (error) {
//     res.status(400).json({ success: false, error: "given email not exist" });
//   }
// }

const getSinglePlayer = async (req,res)=>{
  const _id  = req.params.playerId
  console.log(_id);
  try {
    const user = await User.findOne({ _id });
    // console.log('singleUserData = ',user);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: "user not exist" });
  }
}

const setBoardData = async (req,res)=>{
  const {playerId:_id,boardData} = req.body;
  // console.log("playerId = ",_id);
  try {
      const updatedUser = await User.findOneAndUpdate({ _id}, req.body,{ new: true,})
      //  await User.updateOne({ _id },{ $set: { boardData:[...boardData] } },);
      //  console.log("updated====",updatedUser);
       res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, error: "error" });
  }
}

const addCardData = async (req,res)=>{
  const {playerId:_id,boardData,winner,time} = req.body;
  // console.log("playerCardId = ",_id);
  try {
       const user = await User.findOne({ _id });
       user.cardData.push({...req.body})
      //  console.log("card ====",user.cardData);
       const updatedUser = await User.findOneAndUpdate({ _id}, user,{ new: true,})
      //  console.log("updatedUsercard ====",updatedUser.cardData);
       res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, error: "error" });
  }
}

// const getUserCardDetails = async (req, res) => {
//   try {
//     const user = await User.find({});
//     // console.log(user);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ success: "false", error: "card not exist" });
//   }
// };

module.exports = {
  getAllUser,
  userRegister,
  userLogin,
  addCardData,
  setBoardData,
  getSinglePlayer,
  // singlePlayer,
  // getUserCardDetails
};
