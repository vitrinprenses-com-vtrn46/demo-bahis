const express = require("express");
const path = require("path");
const app = express();
const authRoutes = require("./routes/auth");
const betRoutes = require("./routes/bet");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);   // <- burası önemli
app.use("/bet", betRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));



