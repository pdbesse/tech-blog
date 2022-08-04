const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment } = require('../models');
const withAuth = require('../utils/Auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            // attributes: [
            //     'id',
            //     'title',
            //     'description',
            //     'created_at'
            // ],
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('posts', {
            posts,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', withAuth, async (req, res) => {
    res.render('new-post');
});

// create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        });
        res.render('dash-posts', {
            newPost,
            loggedIn: req.session.loggedIn
        })
        // res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// put post

// delete post

module.exports = router;