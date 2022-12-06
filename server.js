const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())

app.use("/api", require("./src/middleware/api"));
app.use('/public/images', express.static(__dirname + '/public/images'));


app.listen(8081, () => console.log("server is running 8081"));