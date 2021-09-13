require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DBconnect = require("./database");
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./Routes/AuthRoutes.js");
const ActivateRoutes = require("./Routes/ActivateRoutes");
const RoomsRoutes = require("./Routes/RoomsRoutes");

const app = express();
app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));

const PORT = process.env.PORT || 5500;
DBconnect();

app.use(AuthRoutes);
app.use(ActivateRoutes);
app.use(RoomsRoutes);
app.get("/", (req, res) => {
  res.send("hello from NOde js");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
