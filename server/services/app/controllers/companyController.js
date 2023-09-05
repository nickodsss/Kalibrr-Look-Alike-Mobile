const { Company } = require('../models/index')

class CompanyController {

    static async createCompany(request, response, next) {
        try {
            const { name, companyLogo, location, email, description } = request.body

            const createdCompany = await Company.create({
                name, companyLogo, location, email, description
            })

            response.status(201).json(createdCompany)
        } catch (err) {
            next(err)
        }
    }

    static async readCompany(request, response, next) {
        try {
            const result = await Company.findAll()
            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async readCompanyDetail(request, response, next) {
        try {
            const { id } = request.params
            const result = await Company.findOne({
                where: {
                    id
                }
            })
            if (!result) {
                throw { name: 'ErrorData' }
            }
            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async editCompany(request, response, next) {
        try {
            const { id } = request.params
            const { name, companyLogo, location, email, description } = request.body
            const editCompany = await Company.update({
                name,
                companyLogo,
                location,
                email,
                description
            }, {
                where: {
                    id
                }
            })
            if (!editCompany[0]) {
                throw { name: 'ErrorEdit' }
            }
            response.status(201).json(` Data with id ${id} is succeed to edit `)
        } catch (err) {
            next(err)
        }
    }

    static async deleteCompany(request, response, next) {
        try {
            const { id } = request.params

            const result = await Company.destroy({
                where: {
                    id
                }
            })

            if (!result) {
                throw { name: 'ErrorDelete' }
            }

            response.status(200).json({
                message: `Data with id ${id} success to delete`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CompanyController