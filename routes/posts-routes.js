const express = require("express");

const postsControllers = require("../controllers/posts-controller");

const router = express.Router();

router.get("/posts/tiktok", postsControllers.getTikTokPosts);

router.get("/posts/insta", postsControllers.getInstagramPosts);

router.get("/users", postsControllers.getUserProfiles);

module.exports = router;
