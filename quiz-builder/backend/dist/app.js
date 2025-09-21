"use strict";
const express = require("express");
const cors = require("cors");
const quizRoutes = require("./routes/quiz.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/quizzes", quizRoutes);
module.exports = app;
//# sourceMappingURL=app.js.map