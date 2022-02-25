const express = require('express');
const router = express.Router();

const userctrl = require("../controllers/user");

router.post("/signup", userctrl.signUp)
router.post("/login", userctrl.login)
router.get("/:id", userctrl.getUser)
router.put("/:id", userctrl.updateUser)
router.delete("/:id", userctrl.deleteUser)

module.exports = router;