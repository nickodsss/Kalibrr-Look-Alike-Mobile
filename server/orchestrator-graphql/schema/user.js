const HOST = process.env.USER_SERVICE_URL
const axios = require('axios')

const typeDefs = `#graphql
    type user {
        _id: String!
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }

    type MessageCreated {
        acknowledged: Boolean
        insertedId: String
    }

    type MessageDeleted {
        message: String
    }

    type Query {
        getAllUser: [user]
        getUserById(_id:String!): user
    }

    type Mutation {
        createUser(username: String, email: String!, password: String!, phoneNumber: String, address: String): MessageCreated

        deleteUser(_id:String!): MessageDeleted

    }
`

const resolvers = {
    Query: {
        getAllUser: async () => {
            try {
                const { data } = await axios(`${HOST}/users`)
                return data.data
            }
            catch (err) {
                console.log(err)
            }
        },

        getUserById: async (_, { _id }) => {
            try {
                const { data } = await axios(`${HOST}/users/${_id}`)
                return data.data
            } catch (err) {
                console.log(err)
            }
        }
    },

    Mutation: {
        createUser: async (_, { username, email, password, phoneNumber, address }) => {
            try {
                const { data } = await axios.post(`${HOST}/users`, {
                    username, email, password, phoneNumber, address
                });
                return data.message;
            } catch (err) {
                console.log(err)
            }
        },

        deleteUser: async (_, { _id }) => {
            try {
                const { data } = await axios.delete(`${HOST}/users/${_id}`);
                return data;
            } catch (err) {
                console.log(err)
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}