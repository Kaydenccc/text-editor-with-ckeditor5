const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
// config upload image
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './images' });

//conect to db
const mongoose = require('mongoose');
const router = require('./router/router');
mongoose
  .connect(
    'mongodb://AnharF:kayden26@cluster0-shard-00-00.lcn65.mongodb.net:27017,cluster0-shard-00-01.lcn65.mongodb.net:27017,cluster0-shard-00-02.lcn65.mongodb.net:27017/?ssl=true&replicaSet=atlas-r6hpau-shard-0&authSource=admin&retryWrites=true&w=majority',
    { dbName: 'BlogDb' }
  )
  .then((res) => console.log('connect to db'));
// set cors
app.use(cors());
// set server agar dapat menerima data bertipe json dan urlendcode dari luar
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//?STATIC FILE
app.use('/images', express.static(path.join(__dirname, '/', 'images')));

app.use('/api/blog/v1', multipartMiddleware, router);

app.listen(4000, () => {
  console.log('http://localhost:4000');
});
