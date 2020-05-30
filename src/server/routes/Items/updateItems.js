const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.patch("/lists/:id/items/:itemid", async (req, res) => {
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