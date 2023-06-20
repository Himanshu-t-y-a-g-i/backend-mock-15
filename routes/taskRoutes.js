const { taskModel } = require('../model/taskModel');
const taskRoutes = require('express').Router();

taskRoutes.get("/", async (req, res) => {
    const { boardid, uid } = req.body;
    try {
        const tasks = await taskModel.find({ boardid });
        res.status(200).send({ msg: "success", data: tasks });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

taskRoutes.post("/", async (req, res) => {
    const { boardid, title, description, status, uid } = req.body;
    if (!boardid || !title || !description || !status || !uid) {
        res.status(400).send({ msg: "invalid data format" });
    } else {
        try {
            const newTask = new taskModel({ boardid, title, description, status });
            await newTask.save();
            res.status(200).send({ msg: "new task added", data: newTask });
        } catch (e) {
            res.send({ msg: e.message });
        }
    }
})

taskRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await taskModel.findByIdAndDelete(id);
        res.status(200).send({ msg: "task deleted" });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

taskRoutes.patch("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await taskModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({ msg: "task updated" });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

module.exports = { taskRoutes };