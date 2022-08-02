const router = require('express').Router();
const {User, Comment, Post} = require('../models');

// need
// get all posts
// get by id
// 

router.get('/', async (req, res) => {
const userData = await User.findAll(() => {
    res.status(200).json(userData);
})
})

module.exports = router;