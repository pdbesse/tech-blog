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

// get post by id
router.get('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        where: {
          id: req.params.id,
        }
        });
      // res.status(200).json(postData);
      res.render('post-details', {
        postData,
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   router.post('/comment/', withAuth, async (req, res) => {
//     try {
//       const newComment = await Comment.create({
//         text: req.body.text,
//         user_id: req.session.user_id,
//         post_id: req.body.post_id,
//         creator: req.session.username
//       });
//       res.status(200).json(newComment);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// put post

// delete post

module.exports = router;