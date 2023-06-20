const { boardModel } = require('../model/boardModel');
const boardRoutes = require('express').Router();

boardRoutes.get("/", async (req, res) => {
    const { name, uid } = req.body;
    try {
        const boards = await boardModel.find({ uid });
        res.status(200).send({ msg: "success", data: boards });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

boardRoutes.post("/", async (req, res) => {
    const { name, uid } = req.body;
    try {
        const newBoard = new boardModel({ name, uid });
        await newBoard.save();
        res.status(200).send({ msg: "new board created", data: newBoard });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

boardRoutes.delete("/:id", async (req, res) => {
    const { name, uid } = req.body;
    const { id } = req.params;
    try {
        await boardModel.findByIdAndDelete(id);
        res.status(200).send({ msg: `board deleted: ${name}` });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

boardRoutes.patch("/:id", async (req, res) => {
    const { name, uid } = req.body;
    const { id } = req.params;
    try {
        await boardModel.findByIdAndUpdate(id);
        res.status(200).send({ msg: `board updated to ${name}` });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

module.exports = { boardRoutes };