const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const authRouter = require('./router/user.router');
app.use('/v1', authRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});

