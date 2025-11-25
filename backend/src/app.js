const cookieParser = require('cookie-parser');
const express = require('express')
const authRoutes = require("./routes/auth.routes")
const cors = require("cors")
const todoRoutes = require("./routes/todo.routes")
const streakRoutes = require("./routes/streak.routes")
const journalRoutes = require("./routes/journal.routes")
const habitsRoutes = require("./routes/habit.routes")
const habitlogRoutes = require("./routes/habitLog.routes")
const usersRoutes = require("./routes/users.routes")
const PostsRoutes = require("./routes/posts.route");

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



app.use("/auth" , authRoutes)
app.use("/todos", todoRoutes);
app.use("/streak", streakRoutes);
app.use("/journals",journalRoutes);
app.use("/habits", habitsRoutes);
app.use("/habitlog", habitlogRoutes);
app.use("/users", usersRoutes)
app.use("/posts", PostsRoutes);


module.exports=app;