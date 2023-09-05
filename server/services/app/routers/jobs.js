const express = require('express')
const router = express.Router()
const JobController = require('../controllers/jobController')

router.post('/jobs', JobController.createJob)
router.get('/jobs', JobController.readJob)
router.get('/jobs/:id', JobController.readJobDetail)
router.put('/jobs/:id', JobController.editJob)
router.delete('/jobs/:id', JobController.deleteJob)


module.exports = router