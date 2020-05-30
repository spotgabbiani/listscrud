const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.delete("/lists/:id/items/:itemid", async (req, res) => {
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