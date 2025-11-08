const express = require('express');
const { request } = require('../app');

const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares")

const { createTodo, getTodos, toggleTodo, deleteTodo } = require("../controllers/todo.controller");


router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.patch("/:id", authMiddleware, toggleTodo);
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;