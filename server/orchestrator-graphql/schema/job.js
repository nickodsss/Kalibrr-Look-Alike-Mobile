const HOST = process.env.APP_SERVICE_URL
const HOST_USER = process.env.USER_SERVICE_URL
const axios = require('axios')
const Redis = require('ioredis')

const redis = new Redis(13795, process.env.REDIS)

const typeDefs = `#graphql
    type jobs {
        id: ID!
        title: String
        description: String
        companyId: Int
        authorId: String
        jobType: String
        Company: company
        User: user
        
    }

    type user {
        _id: String!
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }

    type formJob {
        id: ID!
        title: String
        description: String
        companyId: Int
        authorId: String
        jobType: String
        Company: company
    }

    type company {
        id: ID!
        name: String
        companyLogo: String
        location: String
        email: String
        description: String
    }
    
    type skill {
        id: ID!
        jobId: Int 
        name: String
        level: String
    }

    type resultPost {
        createdJobs: formJob
        createdSkill: [skill] 
    }


    type jobDetail {
        result: jobs
        resultSkill: [skill]
    }

    type MessageDeleted {
        message: String
    }

    type MessageEdited {
        message: String
    }

    type Query {
        getAllJob: [jobs]
        getJobDetail(id:ID!): jobDetail
    }

    type Mutation {
        createJob(title: String, description: String, companyId: Int , authorId: String,  jobType: String, name1: String, level1: String, name2: String, level2: String, name3: String, level3: String): resultPost

        deleteJob(id:ID!): MessageDeleted

        editJob(id:ID!, title: String, description: String, companyId:Int, jobType: String):MessageEdited
    }
`

const resolvers = {
    Query: {
        getAllJob: async () => {
            try {
                let jobsCache = await redis.get("jobsCache");

                if (jobsCache) {
                    let jobsResult = JSON.parse(jobsCache);
                    return jobsResult
                }
                const { data } = await axios(`${HOST}/jobs`)
                redis.set("jobsCache", JSON.stringify(data));
                return data

            }
            catch (err) {
                console.log(err)
            }
        },

        getJobDetail: async (_, { id }) => {
            try {
                const idNum = +id
                const { data } = await axios(`${HOST}/jobs/${idNum}`)
                const user = await axios(`${HOST_USER}/users/${data.result.authorId}`)
                data.result.User = user.data.data
                return data
            } catch (err) {
                console.log(err)
            }
        }
    },

    Mutation: {
        createJob: async (_, { title, description, companyId, authorId, jobType, name1, level1, name2, level2, name3, level3 }) => {
            try {
                const { data } = await axios.post(`${HOST}/jobs`, {
                    title, description, companyId, jobType, name1, level1, name2, level2, name3, level3
                }, {
                    headers: {
                        authorId
                    }
                });

                redis.del("jobsCache");

                return data
            } catch (err) {
                console.log(err)
            }
        },
        deleteJob: async (_, { id }) => {
            try {
                const idNum = +id
                const { data } = await axios.delete(`${HOST}/jobs/${idNum}`);
                redis.del("jobsCache");
                return data;
            } catch (err) {
                console.log(err)
            }
        },

        editJob: async (_, { id, title, description, companyId, jobType }) => {
            try {
                const idNum = +id
                const { data } = await axios.put(`${HOST}/jobs/${idNum}`, {
                    title, description, companyId, jobType
                })

                redis.del("jobsCache");
                return data
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