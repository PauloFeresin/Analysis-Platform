const express = require("express")
const Site = require("../models/Site")

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const {url, name, interval} = req.body;
        const novoSite = await Site.create({url, name, interval, header: req.headers});
        res.status(201).json(novoSite);
    } catch(err){
        res.status(400).json({ erro: err.message})
    }
});


router.get("/", async (req,res) => {
    try {
        const sites = await Site.find();
        res.json(sites)
    } catch (err) {
        res.status(500).json({erro: err.message})
    }
})

router.put("/", async (req, res) => {
    try {
        const { _id, url, name, interval } = req.body;

        if(!_id){
            return res.status(400).json({erro: "O campo _id é obrigatório"})
        }

        const update = await Site.updateOne(
            { _id },
            { $set: { url, name, interval} },
            {runValidators: true}
        )
        res.status(200).json(update)
    } catch (err) {
        res.status(500).json({ erro: err.message })
    }
})

router.delete("/", async (req,res) => {
    try{
        const {_id} = req.body;
        const result = await Site.deleteOne({_id: _id})

        if(result.deletedCount === 0){
            return res.status(404).json({message: "Site não encontrado"})
        }
        res.status(200).json({message: "Deletado", _id})
        
    }catch(err){
        res.status(500).json({erro: err.message})
    }
})

module.exports = router;
