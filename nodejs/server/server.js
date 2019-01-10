'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var pg = require('pg');
var config = require('./config');

var app = express();
var jsonParser = bodyParser.json();

const pool = new pg.Pool(config.postgres);

app.set('port', config.port);

app.use(cors());


// -----------------------------------------------
// Heroes

app.get('/heroes', function (req, res) {

  pool.connect(function (err, client, done) {
    // console.log('err: ', err, 'client: ', client, 'done: ', done);
    if (client) {
      client.query('SELECT hero_id as "id", name, alter_ego as "alterEgo", likes, default_hero as "default" FROM heroes',
        function (err, result) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send({});
          }
          else {
            res.send(result.rows);
          }
        });
    }
    else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }

  });
});

app.get('/heroes/:id', function (req, res) {
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'SELECT hero_id as "id", name, alter_ego as "alterEgo", likes, default_hero as "default" FROM heroes WHERE hero_id = $1',
        [Number(req.params.id)], function (err, result) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send({});
          }
          else {
            res.send(result.rows[0]);
          }
        });
    }
    else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });
});

app.post('/heroes', jsonParser, function (req, res) {
  var newHero = req.body;

  if (!req.body || !newHero.name || !newHero.alterEgo) {
    return res.sendStatus(400);
  }

  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'INSERT into heroes (name, alter_ego, likes, default_hero) VALUES ($1, $2, $3, $4) RETURNING hero_id',
        [newHero.name, newHero.alterEgo, 0, false], function (err, result) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }
          else {
            res.send({
              /*jshint sub:true*/
              'id': result.rows[0]['hero_id'],
              'name': newHero.name,
              'alterEgo': newHero.alterEgo,
              'likes': 0,
              'default': false
            });
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });
});

app.post('/heroes/:id/like', jsonParser, function (req, res) {
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'UPDATE heroes SET likes = likes + 1 WHERE hero_id = $1;',
        // [Number(req.params.id)], function (err, result) {
        [Number(req.params.id)], function (err) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send({});
          }
          else {
            res.send({});
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });

});

app.delete('/heroes/:id', jsonParser, function (req, res) {
  const idToRemove = Number(req.params.id);
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'DELETE FROM heroes WHERE hero_id = $1 AND default_hero = false',
        // [idToRemove], function (err, result) {
        [idToRemove], function (err) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send({});
          }
          else {
            res.send({});
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });
});

// -----------------------------------------------
// Finally assign port
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
