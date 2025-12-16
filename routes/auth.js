const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = "demo_secret_key";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if(!user) return res.json({ error: "Kullanıcı bulunamadı" });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.json({ error: "Şifre hatalı" });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET);
    res.json({ token });
  });
});

module.exports = router;

