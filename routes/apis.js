const express = require("express");
const axios = require("axios");
const Api = require("../models/Apis");

const router = express.Router();

// Precisa de autenticação
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, url, method, headers, body, expectedStatus, expectedKeys } =
      req.body;

    const newApi = await Api.create({
      name,
      url,
      method,
      headers,
      body,
      expectedStatus,
      expectedKeys,
    });

    res.status(201).json(newApi);
  } catch (err) {
    console.error("Erro ao cadastrar API:", err);
    res.status(500).json({ error: "Erro ao cadastrar API" });
  }
});

module.exports = router;
