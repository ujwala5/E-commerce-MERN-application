const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",   // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,   // जर cookies/auth headers वापरत असशील तर
}));

const authRouter = require('./router/user.router');

app.use('/v1', authRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});

