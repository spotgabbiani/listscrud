const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.get("/lists/:id", async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });
        res.send(list);
    } catch(err){
        res.status(404);
        res.send({ error: "List doesn't exist!" });
    }
});