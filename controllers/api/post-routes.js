const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/Auth');

// get all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post by id 
router.get('/:id', withAuth, async (req, res) => {
  try {
    console.log('test')
    const postData = await Post.findByPk(req.params.id, {
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: [
            'username',
          ],
          include: [
            {
              model: Comment,
              attributes: [
                'id', 'text', 'user_id', 'post_id', 'created_At'
              ]
            }
          ]
        }
      ],
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found.' });
      return;
  }
    res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id
    });
    // res.render
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }

});

// edit post by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!postData) {
      res.status(400).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;