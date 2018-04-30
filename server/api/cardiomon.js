const router = require('express').Router();
const { Cardiomon } = require('../db/models');
module.exports = router;

// GET all products
router.get('/', (req, res, next) => {
  Cardiomon.findAll()
    .then(products => res.json(products))
    .catch(next);
});

// GET a single product
router.get('/:cardiomonId', (req, res, next) => {
  Cardiomon.findOne({
    where: { id: req.params.cardiomonId }
  })
    .then(cardiomon => res.json(cardiomon))
    .catch(next);
});

// router.put('/:cardiomonId', (req, res, next) => {
//   Cardiomon.findOne({
//     where: { id: req.params.cardiomonId }
//   })
//     .then(cardiomon => {
//       // return cardiomon.update()
//     })
//     .catch(next);
// })
