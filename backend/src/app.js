const cookieParser = require('cookie-parser');
const express = require('express')
const authRoutes = require("./routes/auth.routes")
const cors = require("cors")
const todoRoutes = require("./routes/todo.routes")
const streakRoutes = require("./routes/streak.routes")
const journalRoutes = require("./routes/journal.routes")

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


module.exports=app;