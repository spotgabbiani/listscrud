const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.get("/lists/:id/items/:itemid", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id }); 
        const item = list.items.find( item => item.id = req.params.itemid);
        res.send(item);
    } catch(err){
        res.status(404);
        res.send({ error: "couldn't find list items!" });
    }
});