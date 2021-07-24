const express = require('express');
const router = express.Router();
const config = require('../config/knex');
const knex = require('knex')(config);
var crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const secret_key = require('../config/auth');

router.post('/', body('username', 'The username must be written').isLength({ min: 1 }), body('password').isLength({ min: 1 }), async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let username = req.body.username;
    let password = req.body.password;
    var password1 = crypto.createHash('md5').update(password).digest('hex');
    var password2 = crypto.createHash('sha1').update(password1).digest('hex');
    try {
        let buku = await knex('employe').count('* as row').where({ 'username': username, 'password': password2 });
        let datauser = await knex('employe').where({ 'username': username, 'password': password2 });

        if (buku[0].row == 1) {
            const accessToken = jwt.sign({ datauser }, secret_key, {
                expiresIn: 60 * 24 // expires in 24 hours
            });
            res.status(201).json({
                datauser,
                accessToken
            });
        } else {
            res.status(400).json({ 'message': 'gagal login' });
        }
    } catch (e) {
        console.log(e);
    }
})


module.exports = router