const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // include its associated Products
  Category.findAll({
    order: ['id'],
    include: {
      model: Product,
    }
  }).then(dbCategoryData => {
    res.json(dbCategoryData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // include its associated Products
  Category.findByPk(req.params.id, {
    include: {
      model: Product,
    }
  }).then(dbCategoryData => {
    res.json(dbCategoryData);
  });
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
