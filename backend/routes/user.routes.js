const express = require('express');
const router = express.Router();

const userctrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer")

router.post("/signup", userctrl.signUp)
router.post("/login", userctrl.login)
router.get("/:id", auth, userctrl.getUser)
router.put("/:id", auth, multer, userctrl.updateUser)
router.delete("/:id", auth, userctrl.deleteUser)

module.exports = router;