const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.get("/lists/:id/items", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        res.send(list.items);
    } catch(err){
        res.status(404);
        res.send({ error: "couldn't find list items!" });
    }
});