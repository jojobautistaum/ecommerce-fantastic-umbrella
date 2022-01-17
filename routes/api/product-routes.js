const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // include its associated Category and Tag data
  Product.findAll({
    order: ['id'],
    include: [{
      model: Category, 
    }, { 
      model: Tag,
    }]
  }).then(dbProductData => {
    res.json(dbProductData);
  });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // include its associated Category and Tag data
  Product.findByPk(req.params.id, {
    include: [{
      model: Category, 
    }, { 
      model: Tag,
    }]
  }).then(dbProductData => {
    res.json(dbProductData);
  });
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    }).then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updateProduct) => {
    if(!updateProduct) {
      res.status(404).json({message: `No product found with ID ${id}`});
      return;
    }
    res.json(updateProduct);
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbProductData => {
    if(!dbProductData) {
      res.status(404).json({message: `No product found with ID ${id}`});
      return;
    }
    res.json(dbProductData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
