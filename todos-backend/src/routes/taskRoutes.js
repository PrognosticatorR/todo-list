const { Router } = require("express");
const { body } = require("express-validator");
const { validateRequest, requireAuth, currentUser } = require("@auscheon/common");
const StatusTypes = require("../utils/enums");
const {
   createtask,
   deletetask,
   updatetask,
   gettasks,
   markCompleted,
} = require("../controllers/task");

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
   ],
   validateRequest,
   createtask
);

router.put(
   "/:id",
   currentUser,
   requireAuth,
   [
      body("description")
         .trim()
         .isLength({ min: 4 })
         .withMessage("Description must be atleast 4 characters"),
   ],
   validateRequest,
   updatetask
);

router.patch(
   "/markcomplete/:id",
   [
      body("status")
         .isIn(Object.values(StatusTypes))
         .withMessage("current status required"),
   ],
   validateRequest,
   currentUser,
   requireAuth,
   markCompleted
);

router.delete("/:id", currentUser, requireAuth, deletetask);
router.get("/", currentUser, gettasks);

// router.post("/subtask", currentUser, requireAuth, addSubTask);

module.exports = router;
