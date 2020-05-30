const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.post("/lists/:id/items", async (req, res) => {
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