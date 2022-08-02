const sequelize = require('../../config/connection.js');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Post } = require('../../models');

// need
// login?
// get
// get by id
// post
// put by id
// delete

// create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            },
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password.' });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, userData.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password.' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ user: userData, message: 'Login successful.' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// get user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id//, {
        //     include: [
        //         { model: Post, attributes: [
        //                 'title',
        //                 'description',
        //                 'date'
        //             ]
        //         },
        //         { model: Comment, attributes: [
        //                 'title'
        //             ]
        //         },
        //     ],
        // } 
        );
        if (!userData) {
            res.status(404).json({message: 'No user found.'});
            return;
        }
        res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    
});


module.exports = router;