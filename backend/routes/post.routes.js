const express = require('express');
const router = express.Router();

const postctrl = require("../controllers/post");
const auth = require("../middlewares/auth");

router.post("/", postctrl.createPost);
router.get("/:id", postctrl.getPost);
router.get("/", postctrl.getAllPosts);
router.put("/:id", postctrl.updatePost);
router.delete("/:id", postctrl.deletePost);

module.exports = router;



