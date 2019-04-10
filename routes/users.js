var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  
});

router.get('/createUser', function(req, res) {
  res.send('=============================')
});

router.get('/:user_id/destroy', function(req, res) {
  
});

router.post('/:user_id/tasks/create', function (req, res) {
  /* models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function() {
    res.redirect('/');
  }); */
});

module.exports = router;
