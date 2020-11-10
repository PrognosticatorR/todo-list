const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("@auscheon/common");
const Password = require("../services/password");

exports.signup = async (req, res) => {
   const { email, password } = req.body;
   console.log(email, password);
   const existingUser = await User.findOne({ email });
   if (existingUser) {
      throw new BadRequestError("Email is in use!");
   }
   const user = new User({ email, password });
   await user.save();

   const userJwt = jwt.sign(
      {
         id: user.id,
         email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: process.env.SESSION_EXPIRATION }
   );
   req.session = { jwt: userJwt };
   res.status(201).send(user);
};

exports.signin = async (req, res) => {
   const { email, password } = req.body;
   const existingUser = await User.findOne({ email });
   if (!existingUser) {
      throw new BadRequestError("Invalid credentials!");
   }
   const passwordsMatch = await Password.compare(existingUser.password, password);
   if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials!");
   }
   const userJwt = jwt.sign(
      {
         id: existingUser.id,
         email: existingUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: process.env.SESSION_EXPIRATION }
   );

   req.session = { jwt: userJwt };
   res.status(200).send(existingUser);
};

exports.signout = async (req, res) => {
   req.session = null;
   res.send({});
};

exports.getuser = (req, res) => {
   res.send({ currentUser: req.currentUser || null });
};
