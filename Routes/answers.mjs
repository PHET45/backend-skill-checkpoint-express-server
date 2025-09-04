import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const answersRouter = Router();

answersRouter.post("/:answerId/vote", async(req, res) => {
    try {
        return res.json({massage: "Vote on the answer has been recorded successfully."})
    } catch (error) {
        return res.status(500).json({
            massage: "Unable to vote answer."
        });
    }
})


export default answersRouter