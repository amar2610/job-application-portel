require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const db = require('./app/models');
const path = require('path');

const V1Routes = '/api/v1';
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({ origin: true }));
app.use(express.json());
db.sequelize
    .authenticate()
    .then(() => {
        console.log('DB connected!');
    })
    .catch((err) => {
        console.error('DB connection failed!', err.message);
    });
app.use(V1Routes, require('./app/route_controll'));

app.listen(process.env.PORT || 5002, function () {
    console.log('server listening on port:' + process.env.PORT);
});
