const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');

const userData = require('./user-seeds.js');
const postData = require('./post-seeds.js');
const commentData = require('./comment-seeds.js');

const seedDatabase = async () => {
    await sequelize.sync({force: true});
    await User.bulkCreate(userData, {
        individualHooks:true,
        returning: true,
    })

    process.exit(0);
}

seedDatabase();