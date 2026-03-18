const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/students", require("./routes/studentRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
