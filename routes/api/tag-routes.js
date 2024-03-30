const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findByPk } = require('../../models/Product');
// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try{
    let tagData = await Tag.findAll({include:{model: Product}})
  res.json(tagData);

  }catch{
    res.status(400).json(err)
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async(req, res) => {
  const id = req.params.id;
try{
  let tagData = await Tag.findByPk(id, {include: {model: Product}});   
  res.json(tagData);
}catch {
  res.status(400).json(err)
}
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(tagData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try{
    let updated = await Tag.update(req.body, {where: {id: req.params.id}})
    res.json(updated);
  }catch{
    res.status(500).json('err');
  }
});

// delete on tag by its `id` value
router.delete('/:id', async(req, res) => {
  try{

    let deleted = await Tag.destroy({where: {id: req.params.id}})
    res.json(deleted)
  }catch{
    res.status(500).json(err);
  }
});

module.exports = router;
