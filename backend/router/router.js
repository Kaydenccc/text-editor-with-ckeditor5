const express = require('express');
const router = express.Router();
const Model = require('../model/model');
const path = require('path');

// post untuk menghandle upload file image
router.post('/post', (req, res) => {
  console.log('BODY ::', req.body);
  if (!req.body) return res.status(402).json({ msg: 'Bad Request' });
  console.log(req.files.upload);
  // get upload file
  let file = req.files.upload;

  // filter file image
  if (path.extname(file.originalFilename).toLocaleLowerCase() === '.png' || '.jpg' || '.jpeg') {
    res.status(201).json({ uploaded: true, url: `http://localhost:4000/${file.path}` });
  }
});

// post untuk menghendel content pada inputan user
router.post('/content', (req, res) => {
  console.log('debug:', req.body);
  if (!req.body) return res.status(402).json({ msg: 'Bad Request' });
  Model.create({ blog: req.body.blog }, (err, data) => {
    if (err) return res.status(400).json({ msg: 'Bad Request' });
    res.status(201).json({ msg: 'OK', data });
  });
});

// get data from db to client
router.get('/get/content', (req, res) => {
  Model.find({}, (err, data) => {
    if (err) return res.status(400).json({ msg: 'Not Found Data' });
    res.status(200).json({ msg: 'OK', data });
  });
});

// get berdasarkan id
router.get('/get/content/:id', (req, res) => {
  console.log('test', req.params);
  Model.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return res.status(400).json({ msg: 'Not Found Data' });
    res.status(200).json({ msg: 'OK', data });
  });
});

module.exports = router;
