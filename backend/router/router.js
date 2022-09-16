const express = require('express');
const router = express.Router();
const Model = require('../model/model');
const path = require('path');

// post untuk menghandle upload file image
var filePath = '';
router.post('/post', (req, res) => {
  console.log('BODY ::', req.body);
  if (req.files) {
    try {
      if (!req.body) return res.status(402).json({ msg: 'Bad Request' });
      console.log(req.files.upload);
      // get upload file
      const file = req.files.upload;
      // get the file path for store into DB
      filePath = file.path;
      // filter file image
      if (path.extname(file.originalFilename).toLocaleLowerCase() === '.png' || '.jpg' || '.jpeg') {
        res.status(201).json({ uploaded: true, url: `http://localhost:4000/${file.path}` });
      }
    } catch (err) {
      return res.status(err).json({ msg: err.message });
    }
  } else {
    // post untuk menghendel content pada inputan user
    console.log('debug:', req.body);
    console.log('[Path]:', filePath);
    if (!req.body) return res.status(402).json({ msg: 'Bad Request' });
    Model.create({ blog: req.body.blog, thumnail: filePath }, (err, data) => {
      if (err) return res.status(400).json({ msg: 'Bad Request' });
      res.status(201).json({ msg: 'OK', data });
    });
    filePath = '';
  }
  console.log('POST filePath:', filePath);
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

// update data
router.put('/put/content/:id', (req, res) => {
  console.log('update filePath:', filePath);
  console.log('Update id:', req.params); ///------ data yang diupdate------
  Model.findOne({ _id: req.params.id }, (err, data) => {
    Model.findByIdAndUpdate({ _id: data._id }, { blog: req.body.blog, thumnail: filePath || data.thumnail }, (err, data) => {
      if (err) return res.status(400).json({ msg: 'Not Found Data' });
      res.status(200).json({ msg: 'UPDATE OK', data });
      filePath = '';
    });
  });
});
module.exports = router;
