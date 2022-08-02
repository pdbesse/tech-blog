const { Post } = require('../models');

const postData = [
    {
        title: 'Post 1',
        description: 'Post Description 1',
        date: 'June 22, 2021 09:00:00',
        user_id: 1
    },
    {
        title: 'Post 2',
        description: 'Post Description 2',
        date: 'June 22, 2021 09:00:00',
        user_id: 1
    },
    {
        title: 'Post 3',
        description: 'Post Description 3',
        date: 'June 22, 2021 09:00:00',
        user_id: 2
    },
    {
        title: 'Post 4',
        description: 'Post Description 4',
        date: 'June 22, 2021 09:00:00',
        user_id: 2
    },
];

const seedPostData = () => Post.bulkCreate(postData);

module.exports = seedPostData;