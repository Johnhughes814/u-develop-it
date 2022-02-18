const express = require("express");
const router = express.Router();

router.use(require("./partyRoutes"));

router.use(require("./candidateRoutes"));

router.use(require('./voterRoutes'));

router.use(require('./voteRoutes'));

module.exports = router;

module.exports = router;
