const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config');
const Blog = require('./models/blog');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login')



mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.errorHandler);

app.use('/api/blogs',  blogsRouter);

app.use('/api/users', userRouter);

app.use('/api/login', loginRouter);

module.exports = app;