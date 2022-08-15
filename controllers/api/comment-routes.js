const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/Auth');

// get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      // post_id: req.body.post_id
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!commentData) {
    res.status(404).json({ message: 'No comment found with that id!' });
    return;
  }

  res.status(200).json(commentData);

  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!commentData) {
    res.status(404).json({ message: 'No comment found with that id!' });
    return;
  }

  res.status(200).json(commentData);

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;