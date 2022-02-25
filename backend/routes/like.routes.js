const express = require('express');
const router = express.Router();

const likectrl = require("../controllers/like");
const auth = require("../middlewares/auth");

router.post("/", likectrl.addLike);
router.get("/", likectrl.getAllLikes);

module.exports = router;