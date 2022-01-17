const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // include its associated Product data
  Tag.findAll({
    order: ['id'],
    include: {
      model: Product, 
    }, 
  }).then(dbTagData => {
    res.json(dbTagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // include its associated Product data
  Tag.findByPk(req.params.id, {
    include: {
      model: Product, 
    }, 
  }).then(dbTagData => {
    res.json(dbTagData);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(dbPostData => {
    res.json(dbPostData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updateTag => {
    if(!updateTag) {
      res.status(404).json({message: `No tag found with ID ${id}`});
      return;
    }
    res.json(updateTag);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({message: `No tag found with ID ${id}`});
      return;
    }
    res.json(dbTagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
