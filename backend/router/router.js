const express = require("express");
const router = express.Router();
const { home, post, patch, deleteIt } = require("../controller/controller.js");

router.route("/tasks").get(home).post(post);

router.route("/tasks/:id").patch(patch).delete(deleteIt);

module.exports = router;
