const express = require("express");
const router = express.Router();
const db = require("../database");
const jwt = require("jsonwebtoken");
const SECRET = "demo_secret_key";

function verifyToken(req, res, next){
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({ error: "Token yok" });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch(err) {
    res.status(401).json({ error: "Token geçersiz" });
  }
}

router.get("/list", verifyToken, (req, res) => {
  db.all("SELECT * FROM bets WHERE user_id = ?", [req.user.id], (err, rows) => {
    res.json(rows);
  });
});

router.post("/add", verifyToken, (req, res) => {
  const { match, rate, amount } = req.body;
  const potentialWin = rate * amount;
  db.run("INSERT INTO bets (user_id, match, rate, amount, potentialWin) VALUES (?,?,?,?,?)",
    [req.user.id, match, rate, amount, potentialWin], function(err){
      if(err) return res.json({ error: "Hata oluştu" });
      res.json({ message: "Bahis kaydedildi ✅", bet: { id:this.lastID, match, rate, amount, potentialWin } });
    });
});

module.exports = router;
