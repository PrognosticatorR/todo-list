const { Router } = require("express");
const { body } = require("express-validator");
const { validateRequest, requireAuth, currentUser } = require("@auscheon/common");
const {
   create,
   deletesubtask,
   update,
   toggaleStatus,
} = require("../controllers/subTask");
const StatusTypes = require("../utils/enums");

const router = Router();

router.post(
   "/create",
   currentUser,
   requireAuth,
   [
      body("description")
         .trim()
         .isLength({ min: 4 })
         .withMessage("Description must be atleast 4 characters"),
      body("taskId").trim().not().isEmpty().withMessage("task Id required"),
   ],
   validateRequest,
   create
);

router.delete("/:subtaskId", currentUser, requireAuth, validateRequest, deletesubtask);

router.put(
   "/:subtaskId",
   currentUser,
   requireAuth,
   [
      body("description")
         .trim()
         .isLength({ min: 4 })
         .withMessage("Description must be atleast 4 characters"),
   ],
   validateRequest,
   update
);

router.patch(
   "/:subtaskId",
   currentUser,
   requireAuth,
   [
      body("status")
         .isIn(Object.values(StatusTypes))
         .withMessage("current status required"),
   ],
   validateRequest,
   toggaleStatus
);

module.exports = router;
