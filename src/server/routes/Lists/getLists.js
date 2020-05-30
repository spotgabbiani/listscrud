const List = require("../../models/list");
const router = require("express").Router();

module.exports = router.get("/lists", async (req, res) => {
    const lists = await List.find()
    res.send(lists)
});