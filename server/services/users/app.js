if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const cors = require("cors");
const express = require("express");
const { mongoConnection } = require("./config/mongoConnection");
const router = require('./routers/user');
const { errorHandler } = require('./middlewares/errorHandler')
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

// Jadi sekarang sebelum masuk ke routing di bawah,
// kita harus koneksi ke db kita terlebih dahulu
(async () => {
    try {
        await mongoConnection();
        app.listen(port, (_) => console.log(`App is listening at port ${port}`));
    } catch (err) {
        console.log(`Failed to connect to mongodb`);
    }
})();