const express = require('express');
const router = express.Router();
const chatController = require('../controller/index');

// Define routes
router.get('/', chatController.getIndexPage);
router.post('/', chatController.postChatResponse);

module.exports = router;
