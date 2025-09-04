import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const questionsRouter = Router()

questionsRouter.post("/",async(req, res) => {
    return res.json({massage: "Question created successfully."})
})

questionsRouter.get("/", async(req, res) => {
    return res.json()
})

questionsRouter.get("/:questionId", async(req, res) => {
    return res.json()
})

questionsRouter.put("/:qusetionId", async(req, res) => {
    return res.json({massage: "Question updated successfully."})
})

questionsRouter.delete("/:questionId", async(req, res) => {
    return res.json({massage: "Question post has been deleted successfully."})
})

questionsRouter.get("/search", async(req, res) => {
    return res.json()
})

questionsRouter.post("/:questionId/answers", async(req, res) => {
    return res.json({massage: "Answer created successfully."})
})

questionsRouter.get("/:questionId/answers", async(req, res) => {
    return res.json()
})

questionsRouter.delete("/:qusetionId/answers", async(req, res) => {
    return res.json({massage: "All answers for the question have been deleted successfully."})
})

questionsRouter.post("/:qurstionId/vote", async(req, res) => {
    return res.json({massage: "Vote on the question has been recorded successfully."})
})



export default questionsRouter