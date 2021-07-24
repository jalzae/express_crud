const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const programmingLanguagesRouter = require('./routes/data_siswa');
dataGuruRouter = require('./routes/data_guru');
dataLogin = require('./routes/login');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
})

app.use('/data_siswa', programmingLanguagesRouter);
app.use('/data_guru', dataGuruRouter);
app.use('/login', dataLogin);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });


    return;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});