const { userModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email, !password) {
        res.status(400).send({ msg: "invalid data format" });
    } else {
        try {
            const emailCheck = await userModel.findOne({ email });
            if (emailCheck) {
                res.status(400).send({ msg: "user already present" });
            } else {
                const newUser = new userModel({ email, password: bcrypt.hashSync(password, 4) });
                await newUser.save();
                res.status(200).send({ msg: "new user created" });
            }
        } catch (e) {
            res.send({ msg: e.message });
        }
    }
})

userRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email, !password) {
        res.status(400).send({ msg: "invalid data format" });
    } else {
        try {
            const emailCheck = await userModel.findOne({ email });
            if (!emailCheck) {
                res.status(400).send({ msg: "user not found" });
            } else {
                const verify = bcrypt.compareSync(password, emailCheck.password);
                if (!verify) {
                    res.status(400).send({ msg: "incorrect password" });
                } else {
                    const obj = {
                        msg: "user logged in",
                        token: jwt.sign({ uid: emailCheck._id }, "blogapp"),
                        email
                    };
                    res.status(200).send(obj);
                }
            }
        } catch (e) {
            res.send({ msg: e.message });
        }
    }
})

module.exports = { userRoutes };