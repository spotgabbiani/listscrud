const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.patch("/lists/:id", async (req, res) => {
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