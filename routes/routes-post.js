const router = require('express').Router()
const { checkToken } = require('../controllers/AuthController')
const CommentController = require("../controllers/CommentController")
const PostController = require('../controllers/PostController')

router.get("/posts", PostController.getAll)
router.post("/posts", checkToken, PostController.create)
router.get("/posts/:titleUrl", PostController.getOne)
router.put("/posts/:titleUrl", checkToken, PostController.update)
router.delete("/posts/:titleUrl", checkToken, PostController.delete)
router.post("/posts/:titleUrl/comment", checkToken, CommentController.createComment)
module.exports = router