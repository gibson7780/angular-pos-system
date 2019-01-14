var express = require('express');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');
var types = pg.types;
types.setTypeParser(1114, function(stringValue) {
return stringValue;
});
// types.setTypeParser(1114, function(stringValue) {
//   var temp = new Date(stringValue);
//   return new Date(Date.UTC(
//       temp.getFullYear(), temp.getMonth(), temp.getHours(), temp.getMinutes(), temp.getSeconds(), temp.getMilliseconds())
//   );
// });
var config = { 
user:"postgres",
database:"postgres",
password:"11111111",
port:5432,
// 擴充套件屬性
max:20, // 連線池最大連線數
idleTimeoutMillis:3000, // 連線最大空閒時間 3s
};
var jsonParser = bodyParser.json();
var pool = new pg.Pool(config); 
// var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/hello/:name', function (req, res) {
  res.send({'message': 'hi ' + req.params.name + ', this is API!!!'});

});

router.get('/shipments/:name/user', function (req, res) {
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'SELECT ship.shipment_id as "id", ship.user_id as "userId", users.user_name as "userName", ship.formula_id as "formulaId", ship.counts , ship.total, ship.shipment_date as "shipmentDate", mula.formula_name as "formulaName", mula.price FROM shipments as "ship" LEFT JOIN formulas as "mula" on ship.formula_id = mula.formula_id LEFT JOIN users on ship.user_id = users.user_id WHERE users.user_name = $1',
        [String(req.params.name)], function (err, result) {
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

router.get('/users', function (req, res) {

  pool.connect(function (err, client, done) {
    // console.log('err: ', err, 'client: ', client, 'done: ', done);
    if (client) {
      client.query('SELECT user_id as "userId", user_name as "userName" FROM users',
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


router.get('/purchases', function (req, res) {

  pool.connect(function (err, client, done) {
    // console.log('err: ', err, 'client: ', client, 'done: ', done);
    if (client) {
      client.query('SELECT pur.purchase_id as "id", pur.user_id as "userId", users.user_name as "userName", pur.material_id as "materialId", pur.counts , pur.total, pur.purchase_date as "purchaseDate", mat.material_name as "materialName"  FROM purchases as "pur" LEFT JOIN materials as "mat" on pur.material_id = mat.material_id LEFT JOIN users on pur.user_id = users.user_id',
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

router.get('/shipments/:id/formula', function (req, res) {

  pool.connect(function (err, client, done) {
    // console.log('err: ', err, 'client: ', client, 'done: ', done);
    if (client) {
      client.query('SELECT ship.shipment_id as "id", ship.user_id as "userId", users.user_name as "userName", ship.formula_id as "formulaId", ship.counts , ship.total, ship.shipment_date as "shipmentDate", mula.formula_name as "formulaName", mula.price FROM shipments as "ship" LEFT JOIN formulas as "mula" on ship.formula_id = mula.formula_id LEFT JOIN users on ship.user_id = users.user_id WHERE mula.formula_name = $1',
        [String(req.params.id)],function (err, result) {
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

router.get('/purchasesdate/:id', function (req, res) {
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'SELECT pur.purchase_id as "id", pur.user_id as "userId", users.user_name as "userName", pur.material_id as "materialId", pur.counts , pur.total, pur.purchase_date as "purchaseDate", mat.material_name as "materialName"  FROM purchases as "pur" LEFT JOIN materials as "mat" on pur.material_id = mat.material_id LEFT JOIN users on pur.user_id = users.user_id WHERE pur.purchase_date > $1',
        [Number(req.params.id)], function (err, result) {
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


router.get('/materials', function (req, res) {

  pool.connect(function (err, client, done) {
    // console.log('err: ', err, 'client: ', client, 'done: ', done);
    if (client) {
      client.query('SELECT material_id as "materialId", material_name as "materialName", cost FROM materials',
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

router.get('/singlemateriaid/:id', function (req, res) {

  pool.connect(function (err, client, done) {
    // console.log('err: ', err, 'client: ', client, 'done: ', done);
    if (client) {
      client.query('SELECT material_id as "materialId", material_name as "materialName", cost FROM materials WHERE material_id = $1',
        [Number(req.params.id)], function (err, result) {
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

router.post('/materials', jsonParser, function (req, res) {
  var newMaterial = req.body;

  if (!req.body || !newMaterial.materialName || !newMaterial.cost) {
    return res.sendStatus(400);
  }

  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'INSERT into materials (material_name, cost) VALUES ($1, $2) RETURNING material_id',
        [newMaterial.materialName, newMaterial.cost], function (err, result) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }
          else {
            res.send({
              /*jshint sub:true*/
              'id': result.rows[0]['material_id'],
              'materialName': newMaterial.materialName,
              'cost': newMaterial.cost
            });
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });
});

router.get('/singlematerial/:name', function (req, res) {
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'SELECT material_id as "materialId", material_name as "materialName", cost FROM materials WHERE material_name = $1',
        [String(req.params.name)], function (err, result) {
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

router.delete('/materials/:id', jsonParser, function (req, res) {
  const idToRemove = Number(req.params.id);
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'DELETE FROM materials WHERE material_id = $1',
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

router.post('/purchases', jsonParser, function (req, res) {
  var newPurchase = req.body;

  if (!req.body || !newPurchase.userId || !newPurchase.materialId || !newPurchase.counts || !newPurchase.total || !newPurchase.purchaseDate) {
    return res.sendStatus(400);
  }

  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'INSERT into purchases (user_id, material_id, counts, total, purchase_date) VALUES ($1, $2, $3, $4, $5) RETURNING purchase_id',
        [newPurchase.userId, newPurchase.materialId, newPurchase.counts, newPurchase.total, newPurchase.purchaseDate], function (err, result) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }
          else {
            res.send({
              /*jshint sub:true*/
              'id': result.rows[0]['purchase_id'],
              'userId': newPurchase.userId,
              'materialId': newPurchase.materialId,
              'counts': newPurchase.counts,
              'total': newPurchase.total,
              'purchaseDate': newPurchase.purchaseDate
            });
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });
});

router.delete('/purchases/:id', jsonParser, function (req, res) {
  const idToRemove = Number(req.params.id);
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'DELETE FROM purchases WHERE material_id = $1',
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

router.post('/updatesinglematerial', jsonParser, function (req, res) {
  var updateMaterial = req.body;
  if (!req.body || !updateMaterial.materialId || !updateMaterial.materialName || !updateMaterial.cost) {
    return res.sendStatus(400);
  }
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'UPDATE materials SET material_name = $2, cost = $3 WHERE material_id = $1',
        // [Number(req.params.id)], function (err, result) {
        [updateMaterial.materialId, updateMaterial.materialName, updateMaterial.cost], function (err) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send({});
          }
          else {
            res.send({
              'materialId': updateMaterial.materialId,
              'materialName': updateMaterial.materialName,
              'cost': updateMaterial.cost
            });
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });

});

// shipment

router.get('/shipments', function (req, res) {

  pool.connect(function (err, client, done) {
    // console.log('err: ', err, 'client: ', client, 'done: ', done);
    if (client) {
      client.query('SELECT ship.shipment_id as "id", ship.user_id as "userId", users.user_name as "userName", ship.formula_id as "formulaId", ship.counts , ship.total, ship.shipment_date as "shipmentDate", mula.formula_name as "formulaName", mula.price FROM shipments as "ship" LEFT JOIN formulas as "mula" on ship.formula_id = mula.formula_id LEFT JOIN users on ship.user_id = users.user_id',
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

router.get('/shipmentsdate/:id', function (req, res) {
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'SELECT ship.shipment_id as "id", ship.user_id as "userId", users.user_name as "userName", ship.formula_id as "formulaId", ship.counts , ship.total, ship.shipment_date as "shipmentDate", mula.formula_name as "formulaName", mula.price FROM shipments as "ship" LEFT JOIN formulas as "mula" on ship.formula_id = mula.formula_id LEFT JOIN users on ship.user_id = users.user_id WHERE ship.shipment_date > $1',
        [Number(req.params.id)], function (err, result) {
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


router.post('/shipments', jsonParser, function (req, res) {
  var newShipment = req.body;

  if (!req.body || !newShipment.userId || !newShipment.formulaId || !newShipment.counts || !newShipment.total || !newShipment.shipmentDate) {
    return res.sendStatus(400);
  }

  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'INSERT into shipments (user_id, formula_id, counts, total, shipment_date) VALUES ($1, $2, $3, $4, $5) RETURNING shipment_id',
        [newShipment.userId, newShipment.formulaId, newShipment.counts, newShipment.total, newShipment.shipmentDate], function (err, result) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }
          else {
            res.send({
              /*jshint sub:true*/
              'id': result.rows[0]['shipment_id'],
              'userId': newShipment.userId,
              'formulaId': newShipment.formulaId,
              'counts': newShipment.counts,
              'total': newShipment.total,
              'shipmentDate': newShipment.shipmentDate
            });
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });
});

router.delete('/shipments/:id', jsonParser, function (req, res) {
  const idToRemove = Number(req.params.id);
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'DELETE FROM shipments WHERE formula_id = $1',
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

router.get('/contents', function (req, res) {

  pool.connect(function (err, client, done) {
    // console.log('err: ', err, 'client: ', client, 'done: ', done);
    if (client) {
      client.query('SELECT content_id, mula.formula_id as "formulaId", mat.material_id as "materialId", mat.material_name as "materialName", mat.cost as "materialCost", contents.amount FROM contents LEFT JOIN formulas as "mula" on contents.formula_id = mula.formula_id LEFT JOIN materials as "mat" on contents.material_id = mat.material_id',
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

router.post('/contents', jsonParser, function (req, res) {
  var newContent = req.body;

  if (!req.body || !newContent.formulaId || !newContent.materialId || !newContent.amount) {
    return res.sendStatus(400);
  }

  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'INSERT into contents (formula_Id, material_Id, amount) VALUES ($1, $2, $3) RETURNING content_id',
        [newContent.formulaId, newContent.materialId, newContent.amount], function (err, result) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }
          else {
            res.send({
              /*jshint sub:true*/
              'id': result.rows[0]['content_id'],
              'formulaId': newContent.formulaId,
              'materialId': newContent.materialId,
              'amount': newContent.amount
            });
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });
});

router.get('/contents/:id/material', function (req, res) {
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'SELECT content_id, mula.formula_id as "formulaId", mat.material_id as "materialId", mat.material_name as "materialName", mat.cost as "materialCost", contents.amount FROM contents LEFT JOIN formulas as "mula" on contents.formula_id = mula.formula_id LEFT JOIN materials as "mat" on contents.material_id = mat.material_id WHERE mat.material_id = $1',
        [Number(req.params.id)], function (err, result) {
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

router.post('/updatecontent', jsonParser, function (req, res) {
  var updateContent = req.body;
  if (!req.body || !updateContent.formulaId || !updateContent.materialId || !updateContent.amount) {
    return res.sendStatus(400);
  }
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'UPDATE contents SET amount = $3 WHERE formula_id = $1 and material_id = $2',
        // [Number(req.params.id)], function (err, result) {
        [updateContent.formulaId, updateContent.materialId, updateContent.amount], function (err) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send({});
          }
          else {
            res.send({
              'formulaId': updateContent.formulaId,
              'materialId': updateContent.materialId,
              'amount': updateContent.amount
            });
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });

});

router.delete('/contents/:id', jsonParser, function (req, res) {
  const idToRemove = Number(req.params.id);
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'DELETE FROM contents WHERE formula_id = $1',
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

// formula and material
router.get('/formulas', function (req, res) {

  pool.connect(function (err, client, done) {
    // console.log('err: ', err, 'client: ', client, 'done: ', done);
    if (client) {
      client.query('SELECT formula_id as "formulaId", formula_name as "formulaName", cost, price FROM formulas ORDER BY price DESC',
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

router.post('/formulas', jsonParser, function (req, res) {
  var newFormula = req.body;

  if (!req.body || !newFormula.formulaName || !newFormula.cost || !newFormula.price) {
    return res.sendStatus(400);
  }

  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'INSERT into formulas (formula_name, cost, price) VALUES ($1, $2, $3) RETURNING formula_id',
        [newFormula.formulaName, newFormula.cost, newFormula.price], function (err, result) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }
          else {
            res.send({
              /*jshint sub:true*/
              'id': result.rows[0]['formula_id'],
              'formulaName': newFormula.formulaName,
              'cost': newFormula.cost,
              'price': newFormula.price
            });
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });
});

router.get('/singleformula/:name', function (req, res) {
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'SELECT formula_id as "formulaId", formula_name as "formulaName", cost, price FROM formulas WHERE formula_name = $1',
        [String(req.params.name)], function (err, result) {
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


router.post('/updateformula', jsonParser, function (req, res) {
  var updateFormula = req.body;
  if (!req.body || !updateFormula.formulaId || !updateFormula.cost || !updateFormula.price) {
    return res.sendStatus(400);
  }
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'UPDATE formulas SET cost = $2, price = $3 WHERE formula_id = $1',
        // [Number(req.params.id)], function (err, result) {
        [updateFormula.formulaId, updateFormula.cost, updateFormula.price], function (err) {
          done();
          if (err) {
            console.error(err);
            res.status(500).send({});
          }
          else {
            res.send({
              'formulaId': updateFormula.formulaId,
              'cost': updateFormula.cost,
              'price': updateFormula.price
            });
          }
        });
    } else {
      res.status(500).send({'error-message': 'cannot connect to db'});
    }
  });

});

router.delete('/formulas/:id', jsonParser, function (req, res) {
  const idToRemove = Number(req.params.id);
  pool.connect(function (err, client, done) {
    if (client) {
      client.query(
        'DELETE FROM formulas WHERE formula_id = $1',
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
module.exports = router;
