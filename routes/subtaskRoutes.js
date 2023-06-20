const { subtaskModel } = require('../model/subtaskModel');
const subtaskRoutes = require('express').Router();

subtaskRoutes.get("/", async (req, res) => {
    const { taskid, uid } = req.body;
    if (!taskid) {
        res.status(400).send({ msg: "invalid data format" })
    } else {
        try {
            const subtasks = await subtaskModel.find({ taskid });
            res.status(200).send({ msg: "success", data: subtasks });
        } catch (e) {
            res.send({ msg: e.message });
        }
    }
})

subtaskRoutes.post("/", async (req, res) => {
    const { taskid, title } = req.body;
    if (!taskid || !title) {
        res.status(400).send({ msg: "invalid data format" });
    } else {
        try {
            const newSubtask = new subtaskModel({ taskid, title, isCompleted: false });
            await newSubtask.save();
            res.status(200).send({ msg: "new subtask added", data: newSubtask });
        } catch (e) {
            res.send({ msg: e.message });
        }
    }
})

subtaskRoutes.patch("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await subtaskModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({ msg: "subtask updated" });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

subtaskRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await subtaskModel.findByIdAndDelete(id);
        res.status(200).send({ msg: "subtask deleted" });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

module.exports = { subtaskRoutes };