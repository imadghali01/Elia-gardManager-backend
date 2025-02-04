const express = require("express");
const router = express.Router();

app.post("/api/create/user", (req, res) => {});
app.post("/api/create/schedule", (req, res) => {});
app.get("/api/login", (req, res) => {});
app.get("/api/user/schedule", (req, res) => {});
app.get("/api/switch/requests/offer", (req, res) => {});
app.get("/api/switch/requests/sickness", (req, res) => {});
app.get("/api/switch/requests/holydays", (req, res) => {});
app.get("/api/switch/requests/classics", (req, res) => {});

module.exports = router;
