const express = require("express");
const cors = require("cors");
const path = require("path");

// const StudentRoute = require("./db/routes/Student.route")
// const ClassworkRoute = require("./db/routes/Classwork.route")
const AuthorityRoute = require("./Routes/admin.route");
const UserRoute=require("./Routes/user.route.js")
// const Bankhata=require("./db/routes/Bank.route")
// const ComplainRoute = require("./Routes/complain.route");
require("./mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/Routes/Data',express.static(path.join(__dirname+'/Routes/Data')))
// app.use('/complain',ComplainRoute)
app.use('/admin',AuthorityRoute)
app.use('/user',UserRoute)
// app.use('/Authority',RecruitorRoute)
// app.use('/User',ClassworkRoute)
// app.use('/something',Bankhata)

module.exports = app;
