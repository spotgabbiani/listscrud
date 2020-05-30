const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.delete("/lists/:id", async (req, res) => {
    try {
        await List.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch(err) {
        res.status(404)
        res.send({ error: "List doesn't exist!" })
    }
});