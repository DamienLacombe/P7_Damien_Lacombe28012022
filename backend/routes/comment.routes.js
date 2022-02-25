const express = require('express');
const router = express.Router();

const commentctrl = require("../controllers/comment");
const auth = require("../middlewares/auth");

router.post("/", commentctrl.createComment);
router.delete("/:id", commentctrl.removeComment);
router.put("/:id", commentctrl.updateComment);
router.get("/:id", commentctrl.getAllComments);

module.exports = router;