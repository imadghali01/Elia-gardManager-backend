const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const users = require("./routes/users");
const admins = require("./routes/admins");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/admins", admins);

app.listen(port, () => {
  console.log("server online");
});
