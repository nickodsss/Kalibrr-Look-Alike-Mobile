const express = require('express')
const router = express.Router()
const jobRouter = require('./jobs')
const companyRouter = require('./companies')

router.use(jobRouter)
router.use(companyRouter)

module.exports = router