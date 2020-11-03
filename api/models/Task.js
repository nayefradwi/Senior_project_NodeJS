const mongoose = require("mongoose");

taskSchema = new mongoose.Schema({
    room: {
        type: mongoose.Types.ObjectId,
        ref: "Room",
    },
    orderType: {
        type: String,
        enum: ["delivery","receive"],
        default: "delivery"
    },
    necessity:{
        type: mongoose.Types.ObjectId,
        ref: "Necessity",
    },
    status:{
      type:String,
      enum: ["pending","waiting for approval", "completed"],
      default: "waiting for approval"
    },
    description:String,
    creationDate:Date,
    lastTimeStatusUpdated:Date,
});

module.exports = mongoose.model("Task", taskSchema);