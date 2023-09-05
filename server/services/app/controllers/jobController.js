const { Job, Company, Skill } = require('../models/index')
const { sequelize } = require('../models')

class JobController {

    static async createJob(request, response, next) {
        const trx = await sequelize.transaction()
        try {
            const { title, description, companyId, jobType, name1, level1, name2, level2, name3, level3 } = request.body


            if (!name1 || !level1) {
                throw { name: 'Minimum add 3 skills' }
            }
            if (!name2 || !level2) {
                throw { name: 'Minimum add 3 skills' }
            }
            if (!name3 || !level3) {
                throw { name: 'Minimum add 3 skills' }
            }

            const createdJobs = await Job.create({
                title,
                description,
                companyId,
                authorId: request.headers.authorid,
                jobType
            }, { transaction: trx })

            const createdSkill = await Skill.bulkCreate([
                {
                    jobId: createdJobs.id,
                    name: name1,
                    level: level1
                },
                {
                    jobId: createdJobs.id,
                    name: name2,
                    level: level2
                },
                {
                    jobId: createdJobs.id,
                    name: name3,
                    level: level3
                }
            ], {
                transaction: trx
            })

            await trx.commit()

            response.status(201).json({ createdJobs, createdSkill })

        } catch (err) {
            await trx.rollback()
            next(err)
        }
    }

    static async readJob(request, response, next) {
        try {
            const result = await Job.findAll(
                {
                    include: [Company],
                    order: [["id", "ASC"]]
                }
            )
            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async readJobDetail(request, response, next) {
        const trx = await sequelize.transaction()
        try {
            const { id } = request.params
            const result = await Job.findOne({
                include: [Company],
                where: {
                    id
                },
                transaction: trx
            })

            const resultSkill = await Skill.findAll({
                where: {
                    jobId: id
                },
                transaction: trx
            })
            if (!result) {
                throw { name: 'ErrorData' }
            }
            await trx.commit()
            response.status(200).json({ result, resultSkill })
        } catch (err) {
            await trx.rollback()
            next(err)
        }
    }

    static async editJob(request, response, next) {
        try {
            const { id } = request.params
            const { title, description, companyId, jobType } = request.body
            const editJob = await Job.update({
                title,
                description,
                companyId,
                jobType
            }, {
                where: {
                    id
                }
            })
            if (!editJob[0]) {
                throw { name: 'ErrorEdit' }
            }

            response.status(201).json({
                message: `Data with id ${id} success to edit`
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteJob(request, response, next) {
        const trx = await sequelize.transaction()
        try {
            const { id } = request.params
            const result = await Job.destroy({
                where: {
                    id
                },
                transaction: trx
            })
            if (!result) {
                throw { name: 'ErrorDelete' }
            }

            await trx.commit()
            response.status(200).json({
                message: `Data with id ${id} success to delete`
            })
        } catch (err) {
            await trx.rollback()
            next(err)
        }
    }
}

module.exports = JobController