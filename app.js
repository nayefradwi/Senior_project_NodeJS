const express = require("express");
const cp = require('cookie-parser');
const parser = require("body-parser");
const app = express();
const socketService = require("./api/services/SocketIoService");
const io = socketService(app)
const mongoose = require("mongoose");
require("dotenv").config();
const DATABASE_URL =  process.env.DB_URL||"mongodb://localhost/senior"
const indexRouter = require("./api/routes/index");
const hospitalRouter = require("./api/routes/hospital");
const nurseRouter = require("./api/routes/nurse");
const necessityRouter = require("./api/routes/necessity")
const roomRouter = require("./api/routes/room")
const mapRouter = require("./api/routes/map")
const taskRouter = require("./api/routes/task")
const notificationService = require("./api/services/NotificationService")
app.use(parser.json());
app.use(cp());
notificationService.initialize();

const {createAdmin} = require("./api/seed")

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// createAdmin();
app.use(indexRouter);
app.use("/hospitals",hospitalRouter);
app.use("/nurses",nurseRouter);
app.use("/necessities", necessityRouter)
app.use("/rooms", roomRouter)
app.use("/maps", mapRouter)
app.use("/tasks",taskRouter);

io.server.listen(6969, () => console.log("server started"))
