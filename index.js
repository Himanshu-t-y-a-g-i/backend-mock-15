const express = require("express");
const { connection } = require("./mongoose/connection");
const { userRoutes } = require("./routes/userRoutes");
const { quizRoutes } = require("./routes/quizRoutes");
const { authentication } = require("./middleware/authentication");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is up and running");
})

app.use("/api", userRoutes);

app.use(authentication);

app.use("/api/quiz", quizRoutes);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log(`Database connection established`);
    } catch (e) {
        console.log(e.message);
    }
    console.log("Server is live at port", process.env.PORT);
})