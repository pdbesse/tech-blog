const router = require('express').Router();
const { User, Comment, Post } = require('../models');

// need
// get all posts
// get by id
// 

router.get('/', async (req, res) => {
    try {
    const userData = await Post.findAll({
        include: [
            {
                model: User,
                model: Comment
            }
        ]
    });  
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;