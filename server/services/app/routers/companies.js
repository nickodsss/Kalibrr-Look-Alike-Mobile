const express = require('express')
const router = express.Router()
const CompanyController = require('../controllers/companyController')

router.get('/companies', CompanyController.readCompany)
router.get('/companies/:id', CompanyController.readCompanyDetail)
router.post('/companies', CompanyController.createCompany)
router.put('/companies/:id', CompanyController.editCompany)
router.delete('/companies/:id', CompanyController.deleteCompany)

module.exports = router