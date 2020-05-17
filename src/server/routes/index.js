const express = require("express");
const List = require("../models/list");
const router = express.Router();
const Item = require("../models/item").model;

router.get("/lists", async (req, res) => {
    const lists = await List.find()
    res.send(lists)
});

router.post("/lists", async (req, res) => {
    try {
        const list = new List({
            name: req.body.name,
            items: req.body.items
        })
        await list.save();
        res.send(list);
    } catch(err){
        res.status(500);
        res.send({ error: "List cannot be created!" });
    }
});

router.get("/lists/:id", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        res.send(list);
    } catch(err){
        res.status(404);
        res.send({ error: "List doesn't exist!" });
    }
});

router.patch("/lists/:id", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id })
        if (req.body.name) {
            list.name = req.body.name;
        }

        if (req.body.items) {
            list.items = req.body.items;
        }

        await list.save();
        res.send(list)
    } catch(err) {
        res.status(404)
        res.send({ error: "couldn't update list!", err: err });
    }
});

router.delete("/lists/:id", async (req, res) => {
    try {
        await List.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch(err) {
        res.status(404)
        res.send({ error: "List doesn't exist!" })
    }
});

router.get("/lists/:id/items", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        res.send(list.items);
    } catch(err){
        res.status(404);
        res.send({ error: "couldn't find list items!" });
    }
});

router.get("/lists/:id/items/:itemid", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id }); 
        const item = list.items.find( item => item.id = req.params.itemid);
        res.send(item);
    } catch(err){
        res.status(404);
        res.send({ error: "couldn't find list items!" });
    }
});

router.post("/lists/:id/items", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        if(req.body.item){
            list.items.push(req.body.item);
        }
        await list.save();
        res.send(list);
    } catch(err){
        res.status(404);
        res.send({ error: "couldn't add an item to the list!" });
    }
});

router.patch("/lists/:id/items/:itemid", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id }); 
        const item = list.items.find( item => item.id = req.params.itemid);
        item.name = req.body.item.name;
        await list.save();
        res.send(item);
    } catch(err){
        res.status(404);
        res.send({ error: "couldn't update item information!" });
    }
});

router.delete("/lists/:id/items/:itemid", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id }); 
        const items = list.items.filter( item => item.id !== req.params.itemid);
        list.items = items;
        await list.save();
        res.send(list);
    } catch(err){
        res.status(404);
        res.send({ error: "couldn't delete item!" });
    }
});



module.exports = router