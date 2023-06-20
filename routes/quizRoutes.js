const { quizModel } = require("../model/quizModel");

const quizRoutes = require("express").Router();

quizRoutes.get("/", async (req, res) => {
    try {
        const quiz = await quizModel.find();
        res.send({ msg: "success", data: quiz });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

quizRoutes.post("/", async (req, res) => {
    const quiz = req.body;
    if (!quiz.title || !quiz.description || quiz.questions.length < 1) {
        res.status(400).send({ msg: "invalid data format" });
    } else {
        try {
            const newObj = {
                quiz: req.body,
                leaderboard: []
            }
            console.log(newObj);
            const newQuiz = new quizModel(newObj);
            await newQuiz.save();
            res.status(200).send({ msg: "quiz created", data: newObj });
        } catch (e) {
            res.send({ msg: e.message });
        }
    }
})

quizRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await quizModel.findByIdAndDelete(id);
        res.status(200).send({ msg: "quiz deleted" });
    } catch (e) {
        res.send({ msg: e.message });
    }
})

module.exports = { quizRoutes };