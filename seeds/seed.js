const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./user-seeds.json');
const seedPostData = require('./post-seeds.js');
const seedCommentData = require('./comment-seeds.js');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await seedPostData();
    await seedCommentData();

    process.exit(0);
}

seedDatabase();