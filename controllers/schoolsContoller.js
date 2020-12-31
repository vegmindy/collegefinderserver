const express = require('express');
const router = express.Router();
const{Schools} = require('../models/index');
const validateSession = require('../middleware/validateSession');
const { findOne } = require('../models/user');

router.get("/allschools", (req, res) =>{
    Schools.findAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
})

module.exports = router;