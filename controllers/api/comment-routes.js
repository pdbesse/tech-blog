const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// get all comments
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [
          {
            model: User,
            model: Post
          }
        ]
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // get post by id
  router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [
          {
            model: User,
            model: Post
          }
        ]
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with that id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // create new comment
  router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create(req.body);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  
  });
  
  // edit comment by id
  router.put('/:id', async (req, res) => {
    try {
      const commentData = await Comment.update(req.body, {
        where: {
          id: req.params.id,
        }
      });
      if (!commentData) {
        res.status(400).json({ message: 'No comment found with this id!' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
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
      res.status(500).json(err);
    }
  });


module.exports = router;