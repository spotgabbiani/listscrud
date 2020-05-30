const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.post("/lists", async (req, res) => {
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