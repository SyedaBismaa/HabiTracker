const express = require('express');
const auth = require('../middlewares/auth.middlewares');
const chatController = require('../controllers/chat.controller');

const router = express.Router();

// Get chat + messages
router.get('/', auth, chatController.getChat);

// Send message to AI → get response
router.post('/message', auth, chatController.sendMessage);
router.delete("/reset", auth, chatController.createNewChat);


module.exports = router;
