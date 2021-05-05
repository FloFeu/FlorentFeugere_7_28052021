"use strict";

const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//localhost:3000/api/comments/

router.post('/', auth, commentCtrl.createComment);
router.get('/posts/:id', auth, commentCtrl.getComments);
router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;