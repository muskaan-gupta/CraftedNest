const express = require('express');
const { verifyRole } = require('../middleware.js/auth.middleware');
const router = express.Router();

router.get('/admin-data', verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Admin data' });
});

router.get('/user-data', verifyRole(['user', 'admin']), (req, res) => {
  res.json({ message: 'User data' });
});

module.exports = router;