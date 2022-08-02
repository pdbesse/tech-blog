const { Comment } = require('../models');

const commentData = [
    {
        post_id: 1,
        text: 'Comment 1',
        user_id: 1
    },
    {
        post_id: 2,
        text: 'Comment Description 2',
        user_id: 1
    },
    {
        post_id: 3,
        text: 'Comment 3',
        user_id: 2
    },
    {
        post_id: 4,
        text: 'Comment 4',
        user_id: 2
    },
];

const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData;