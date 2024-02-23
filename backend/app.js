require("dotenv").config();
const express = require("express");
const app = express();
const cors=require("cors");
app.use(express.json());//to convert the data to json format,otherwise we cant post data to the server from postman
app.use(cors());//to allow the client to access the server
const userRouter = require("./routes/api/users/user.router");
const pool = require("./routes/database");
const doctorRouter = require("./routes/api/doctors/doctor.router");

app.use("/api/doctor", doctorRouter);


app.listen(process.env.APP_PORT, () => {
  console.log("Server has started on port:", process.env.APP_PORT);
});

