const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const userRouter = require('./routers/userRouter');
const flightRouter = require('./routers/flightRouter');
const checkAuth = require('./middlewares/checkAuth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', checkAuth, userRouter);
app.use('/flights', checkAuth, flightRouter);

app.use((req, res, next) => {
  //build page 404
  next(new Error('Page Not Found'));
});

app.use((err, req, res, next) => {
  res.status(500).json({error: err.error});
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running in port ' + process.env.PORT || 3000));
