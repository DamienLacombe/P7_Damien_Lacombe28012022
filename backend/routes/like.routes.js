const express = require('express');
const router = express.Router();

const likectrl = require("../controllers/like");
const auth = require("../middlewares/auth");

router.post("/", auth, likectrl.addLike);
router.get("/:id", auth, likectrl.getAllLikes);

module.exports = router;