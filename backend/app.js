require("dotenv").config();
const express = require("express");

const app = express();
const router = require("./router/router.js");

const cors = require("cors");
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
