const router = require('express').Router();
const pool = require('../models/conn');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post('/register', validInfo, async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length > 0) {
            return res.status(401).send('User already exists, try a different email');
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, bcryptPassword]);
        const token = jwtGenerator(newUser.rows[0].id)
        res.json({ token });
    } catch (error) {
        console.log('ERROR: ', error);
        res.status(500).send('Server Error');
    }
})

router.post('/login', validInfo, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0 ) {
            return res.status(401).json('Password or Email is incorrect');
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json('Password or Email is incorrect');
        }
        const token = jwtGenerator(user.rows[0].id)
        res.json({token})

    } catch (error) {
        console.log('ERROR: ', error);
        res.status(500).send('Server Error');
    }
})

router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log('ERROR: ', error);
        res.status(500).send('Server Error');
    }
})

router.get('/logout', (req, res) => {
    req.user = null;
    res.status(200);
})


module.exports = router;