import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const questionsRouter = Router()

questionsRouter.post("/",async(req, res) => {
    return res.json({massage: ""})
})

export default questionsRouter