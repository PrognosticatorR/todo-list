const { Router } = require("express");
const { body } = require("express-validator");
const { validateRequest, currentUser } = require("@auscheon/common");
const { signup, signin, signout, getuser } = require("../controllers/user");

const router = Router();

router.post(
   "/signup",
   [
      body("email").isEmail().withMessage("Email must be valid."),
      body("password")
         .trim()
         .isLength({ min: 4, max: 20 })
         .withMessage("Password must be between 4 and 20 characters"),
   ],
   validateRequest,
   signup
);

router.post(
   "/signin",
   [
      body("email").isEmail().withMessage("Email must be valid!"),
      body("password").trim().notEmpty().withMessage("You must supply a password"),
   ],
   validateRequest,
   signin
);
router.post("/signout", signout);
router.get("/currentuser", currentUser, getuser);

module.exports = router;
