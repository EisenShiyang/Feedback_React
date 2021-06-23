const express = require('express');
const router = express.Router();
const {emailFeedback} = require('../controller/feedback') // Require a method called emailFeedback

router.get('/', emailFeedback); // 這裡只用 '/' 的原因是，server.js中已經使用 '/api' 了。如果在這裡又用 '/api'，就會變成對 '/api/api'送req

module.exports = router;
