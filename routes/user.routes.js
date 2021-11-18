const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// auth
router.post("/register", authController.signUp);
 
// user DB
router.get("/", userController.getAllUsers);

module.exports = router;