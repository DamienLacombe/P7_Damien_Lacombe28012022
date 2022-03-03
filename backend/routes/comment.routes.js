const express = require('express');
const router = express.Router();

const commentctrl = require("../controllers/comment");
const auth = require("../middlewares/auth");

router.post("/", auth, commentctrl.createComment);
router.delete("/:id", auth, commentctrl.removeComment);
router.put("/:id", auth, commentctrl.updateComment);
router.get("/:id", auth, commentctrl.getAllComments);

module.exports = router;