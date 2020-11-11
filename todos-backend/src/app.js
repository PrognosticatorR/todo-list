require("dotenv").config();
require("express-async-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const morgan = require("morgan");
const { errorHandler, NotFoundError } = require("@auscheon/common");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const subtaskRourer = require("./routes/subtaskRoutes");

const app = express();
app.use(morgan("dev"));
app.set("trust proxy", true);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
   cookieSession({
      signed: false,
   })
);

app.use(express.static(path.join(__dirname, "/todos-client/build")));

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/subtasks", subtaskRourer);
app.use(errorHandler);

// app.use(signinRouter);
// app.use(signoutRouter);
// app.use(signupRouter);

app.all("*", async () => {
   throw new NotFoundError();
});

module.exports = app;
