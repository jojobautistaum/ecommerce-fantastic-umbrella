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
  Category.create({
    category_name: req.body.category_name
  }).then(dbPostData => {
    res.json(dbPostData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updateCategory => {
    if(!updateCategory) {
      res.status(404).json({message: `No category found with ID ${id}`});
      return;
    }
    res.json(updateCategory);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}); 

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: `No category found with ID ${id}`});
      return;
    }
    res.json(dbCategoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
