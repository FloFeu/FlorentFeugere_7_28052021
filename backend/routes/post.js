"use strict";

const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// localhost:3000/api/posts/...

router.post('/', auth, multer, postCtrl.createPost);
router.post('/like/:id', auth, postCtrl.likePost)
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/:id/likes', auth, postCtrl.whoLiked);
router.get('/users/:id', auth, postCtrl.getPostsByUser);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, multer, postCtrl.deletePost);

module.exports = router;