// user.router.js
const { getDoctors } = require('./doctor.controller');

const router = require('express').Router();



// Existing routes

router.get('/', getDoctors);


module.exports = router;
