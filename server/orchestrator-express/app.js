const Redis = require('ioredis')
const axios = require('axios')
const cors = require('cors')
const express = require('express')

const FIRST_SERVER_URL = "http://localhost:3000"
const SECOND_SERVER_URL = "http://localhost:3001"

const redis = new Redis(13795, process.env.REDIS);

const app = express()
const port = 8000

app
    .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .get("/jobs", async (_req, res, next) => {
        try {
            let jobsCache = await redis.get("jobsCache");

            if (jobsCache) {
                let jobsResult = JSON.parse(jobsCache);
                return res.status(200).json(jobsResult);
            }

            // TITIK DUA SETELAH DATA ITU ARTINYA ALIAS
            const { data: response } = await axios.get(`${SECOND_SERVER_URL}/jobs`);

            redis.set("jobsCache", JSON.stringify(response));

            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    })
    .get("/jobs/:id", async (req, res, next) => {
        try {
            const { id } = req.params
            const { data: response } = await axios.get(`${SECOND_SERVER_URL}/jobs/${id}`);

            return res.status(200).json(response)
        } catch (err) {
            next(err);
        }
    })
    .post("/jobs", async (req, res, next) => {
        try {
            const { title, description, companyId, jobType, name1, level1, name2, level2, name3, level3 } = req.body

            const { data: response } = await axios.post(`${SECOND_SERVER_URL}/jobs`, {
                title, description, companyId, jobType, name1, level1, name2, level2, name3, level3
            }, {
                headers: {
                    authorId: req.headers.authorid
                }
            });

            redis.del("jobsCache");

            return res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    })
    .delete("/jobs/:id", async (req, res, next) => {
        try {
            const { id } = req.params;

            const { data: response } = await axios.delete(
                `${SECOND_SERVER_URL}/jobs/${id}`
            );
            redis.del("jobsCache");

            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    })
    .put("/jobs/:id", async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, description, companyId, jobType } = req.body

            const { data: response } = await axios.put(
                `${SECOND_SERVER_URL}/jobs/${id}`, {
                title, description, companyId, jobType
            }
            );

            // Because we're using cache, we need to invalidate the cache
            // (For the user's data accuracy)
            redis.del("jobsCache");

            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    })
    .get("/users", async (_req, res, next) => {
        try {
            const { data: response } = await axios.get(`${FIRST_SERVER_URL}/users`);

            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    })
    .get("/users/:id", async (req, res, next) => {
        try {
            const { id } = req.params
            const { data: response } = await axios.get(`${FIRST_SERVER_URL}/users/${id}`);

            return res.status(200).json(response)
        } catch (err) {
            next(err);
        }
    })
    .delete("/users/:id", async (req, res, next) => {
        try {
            const { id } = req.params;

            const { data: response } = await axios.delete(
                `${FIRST_SERVER_URL}/users/${id}`
            );

            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    })
    .post("/users", async (req, res, next) => {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const { data: response } = await axios.post(`${FIRST_SERVER_URL}/users`, {
                username, email, password, phoneNumber, address
            });

            return res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    })
    .use((err, _req, res, _next) => {

        res.status(500).json({
            statusCode: 500,
            error:
                "Something wicked happened, but error handler not implemented yet !",
        });
    });

app.listen(port, (_) => console.log(`Orchestrator is working at port ${port}`));
