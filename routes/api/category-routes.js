const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{

    const catData = await Category.findAll({ 
      include:{model: Product}
    })
    res.json(catData);
  }
  catch{
    res.status(400).json(err)

  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
const id = req.params.id;
try{

  let categoryData = await Category.findByPk(req.params.id, {include: {model: Product}})  
  res.json(categoryData);
}catch {
  res.status(400).json(err)
}


});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(categoryData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    let updated = await Category.update(req.body, {where: {id: req.params.id}})
    res.json(updated);
  }catch{
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{

    let deleted = await Category.destroy({where: {id: req.params.id}})
    res.json(deleted)
  }catch{
    res.status(500).json(err);
  }
});

module.exports = router;
