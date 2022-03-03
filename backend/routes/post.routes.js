const express = require('express');
const router = express.Router();

const postctrl = require("../controllers/post");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer")

router.post("/", auth, multer, postctrl.createPost);
router.get("/:id", auth, postctrl.getPost);
router.get("/",auth, postctrl.getAllPosts);
router.put("/:id", auth, multer, postctrl.updatePost);
router.delete("/:id", auth, postctrl.deletePost);

module.exports = router;



