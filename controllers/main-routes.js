const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/Auth');

// need
// get all posts
// get by id
// 

// logged out users can see page
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include:
                [
                    { model: User },
                ],
        });

        const posts = postData.map((posts) => posts.get({ plain: true }));
        // console.log(posts)
        res.render('posts', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/api/posts/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                Comment,
            ]
        });
        const post = postData.get({ plain: true });
        // console.log(post)
        res.render('post', post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});


module.exports = router;