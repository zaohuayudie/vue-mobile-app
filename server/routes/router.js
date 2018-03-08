/**
 * Created by antianlu on 2017/10/18.
 */
const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

router.get('*', function (req, res, next) {
  fs.readFile(path.join(__dirname, '..', '..', 'public/h5/dist/index.html'), 'utf8', function (err, html) {
    if (err) {
      return next(err)
    }
    res.send(html)
  });
});

module.exports = router;
