const User = require("../models/user");
const { hashPassword } = require('../helpers/bcrypt')

class UserController {

    static async createUser(request, response, next) {
        try {
            const { username, email, password, phoneNumber, address } = request.body

            const created = await User.create({
                username,
                email,
                password: hashPassword(password),
                role: 'Admin',
                phoneNumber,
                address
            })

            response.status(201).json({
                message: created
            })
        } catch (err) {
            next(err)
        }
    }

    static async findAllUser(request, response, next) {
        try {
            const data = await User.findAll()
            data.forEach((el) => {
                delete el.password
            })
            response.status(200).json({
                statusCode: 200,
                data,
            });
        } catch (err) {
            next(err)
        }
    }

    static async findUserById(request, response, next) {
        try {
            const { id } = request.params;
            const foundUser = await User.findById(id);

            response.status(200).json({
                statusCode: 200,
                data: foundUser,
            });

        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(request, response, next) {
        try {
            const { id } = request.params
            const result = await User.destroy(id)
            response.status(200).json({
                message: `Data with id ${id} success to delete`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController