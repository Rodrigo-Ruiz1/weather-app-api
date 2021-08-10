const router = require('express').Router();
const pool = require('../models/conn');
const authorization = require('../middleware/authorization');
const UsersModel = require('../models/UsersModel');

router.get('/', authorization, async (req, res) => {
    try {
        const user = await pool.query('SELECT id, username, profile_pic FROM users WHERE id = $1', [req.user])
        res.json({user : user.rows[0]})

    } catch (error) {
        console.log('ERROR: ', error);
        res.status(500).json('Server Error');
    }
})

router.patch('/profile_pic', async (req, res) => {
    const { url, user_id } = req.body;
    const response = await UsersModel.addProfilePic(url, user_id);
    console.log(response)
    if (response !== undefined) {

        res.json({message : 'success'}).status(200);
    } else {
        res.json({error: 'error'})
    }
})

router.get('/favorites/:user_id', async (req, res) => {
    user_id = req.params.user_id;
    const response = await UsersModel.getAllFavorites(user_id);
    if (response !== undefined) {
        res.json(response.rows).status(200);
    } else {
        res.status(404);
    }
})

router.post('/add_favorite', async (req, res) => {
    const {city, state, user_id} = req.body;
    const response = await UsersModel.addFavorite(city, state, user_id);
    res.json(response).status(200);
})

router.delete('/delete_favorite', async (req, res) => {
    const {id} = req.body;
    const response = await UsersModel.deleteFavorite(id);
    res.json(response).status(200);
})




module.exports = router;