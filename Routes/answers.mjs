import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const answersRouter = Router();

answersRouter.post("/:answerId/vote", async(req, res) => {
    return res.json({massage: "Vote on the answer has been recorded successfully."})
})


export default answersRouter