const express = require('express');
const router = express.Router();
const config = require('../config/knex');
const knex = require('knex')(config);
const authJwt = require('../middleware/authJwt');

router.get('/', async(req, res) => {
    try {
        let barang = await knex('barang');
        res.json(barang)
    } catch (e) {
        console.log(e);
    }
})

router.post('/', async(req, res) => {
    try { 
        let Nama_Barang = req.body.Nama_Barang;
        
        let users_created_at = req.body.users_created_at;
        
        let id = await knex('barang').insert({
        'Nama_Barang': Nama_Barang,
        'users_created_at': users_created_at,
        })
        res.json({
        Nama_Barang,
        users_created_at,
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})


router.put('/:id', async(req, res) => {
    try {
        let id_Barang = req.body.id_Barang;
        let Nama_Barang = req.body.Nama_Barang;
        await knex('barang').where('id_Barang', id_Barang).update({
        'Nama_Barang': Nama_Barang,
        })
        res.json({
        id_Barang,
        Nama_Barang,
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})
router.get('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;

        let barang = await knex('barang').where('id_Barang', id);
        res.json({
            barang
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})


router.delete('/:id', async(req, res) => {
    try {
        let id = req.params.id;

        await knex('barang').where('id_Barang', id).del()
        res.json({
            id,
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})

module.exports = router