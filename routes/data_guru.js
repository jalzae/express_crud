const express = require('express');
const router = express.Router();
const config = require('../config/knex');
const knex = require("knex")(config);
const authJwt = require('../middleware/authJwt');

router.get('/',authJwt, async(req, res) => {
    try {
        let buku = await knex('buku');
        res.json(buku)
    } catch (e) {
        console.log(e);
    }
})
router.post('/',authJwt, async(req, res) => {
    try {
        let judul = req.body.judul;
        let sinopsis = req.body.sinopsis;
        let penulis = req.body.penulis;

        let id = await knex('buku').insert({
            'judul': judul,
            "sinopsis": sinopsis,
            "penulis": penulis
        })
        res.json({
            id: id[0],
            judul,
            sinopsis,
            penulis
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})
router.put('/:id', async(req, res) => {
    try {
        let id = req.params.id;
        let judul = req.body.judul;
        let sinopsis = req.body.sinopsis;
        let penulis = req.body.penulis;

        await knex('buku').where('id', id).update({
            "judul": judul,
            "sinopsis": sinopsis,
            "penulis": penulis
        })
        res.json({
            id,
            judul,
            sinopsis,
            penulis
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})


router.get('/:id', authJwt, async(req, res, next) => {
    try {
        let id = req.params.id;

        let guru = await knex('data_guru').where('id_guru', id);
        res.json({
            guru
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})

router.delete('/:id',authJwt, async(req, res) => {
    try {
        let id = req.params.id;

        await knex('buku').where('id', id).del()
        res.json({
            id,
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})

module.exports = router