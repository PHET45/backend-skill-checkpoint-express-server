import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const questionsRouter = Router()

questionsRouter.post("/",async(req, res) => {
    try {
        return res.json({massage: "Question created successfully."})
    } catch (error) {
        return res.status(400).json({
            massage: "Invalid request data."
        });
    }
    
});

questionsRouter.get("/", async(req, res) => {
    let results
    try {
        results = await connectionPool.query(`select * from questions`)
    } catch (error) {
        return res.status(500).json({
            massage: "Unable to fetch questions."
        });
    }
    return res.json({
        data: results.rows
    });
});

questionsRouter.get("/search", async(req, res) => {
    let results
    const title = req.query.title;
    const category = req.query.category;
    try {
        results = await connectionPool.query(
            `
            select * from questions 
            where
                ($1::text is null or $1::text = '' or title = $1::text)
            and
                ($2::text is null or $2::text = '' or category = $2::text);
            `,
            [title, category]
        )
    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({
            massage: "Unable to fetch questions.",
            error: error.message
        });
    }
    return res.json({
        data: results.rows,
    });
});

questionsRouter.get("/:questionId", async(req, res) => {
    try {
        const questionIdFromClient = req.params.questionId
        const results = await connectionPool.query(
            `
            select * from questions where id=$1
            `,[questionIdFromClient])
        
        if(!results.rows[0]){
            return res.status(404).json({
                massage: "Question not found."
            });
        }
        return res.json({
            data: results.rows[0],
        })
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({
            massage: "Unable to fetch question."
        });
    }
});

questionsRouter.put("/:qusetionId", async(req, res) => {
    try {
        return res.json({massage: "Question updated successfully."})
    } catch (error) {
        return res.status().json({
            massage: ""
        });
    }
});

questionsRouter.delete("/:questionId", async(req, res) => {
    try {
        return res.json({massage: "Question post has been deleted successfully."})
    } catch (error) {
        return res.status().json({
            massage: ""
        });
    }
    
});



questionsRouter.post("/:questionId/answers", async(req, res) => {
    try {
        return res.json({massage: "Answer created successfully."})
    } catch (error) {
        return res.status().json({
            massage: ""
        });
    }
});

questionsRouter.get("/:questionId/answers", async(req, res) => {
    try {
        const questionIdFromClient = req.params.questionId
        // ตรวจสอบว่าคำถามมีอยู่จริงหรือไม่
        const questionCheck = await connectionPool.query(
            `select * from questions where id=$1`,
            [questionIdFromClient]
        )
        if(!questionCheck.rows[0]){
            return res.status(404).json({
                massage: "Question not found."
            });
        }
        // ดึงคำตอบจากตาราง answers
        const results = await connectionPool.query(
            `
            select id, content from answers where question_id=$1
            `,
            [questionIdFromClient]
        )
        return res.json({
            data: results.rows
        })
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({
            massage: "Unable to fetch answers."
        });
    }
});
questionsRouter.delete("/:qusetionId/answers", async(req, res) => {
    try {
        return res.json({massage: "All answers for the question have been deleted successfully."})
    } catch (error) {
        return res.status().json({
            massage: ""
        });
    }
});

questionsRouter.post("/:qurstionId/vote", async(req, res) => {
    try {
        return res.json({massage: "Vote on the question has been recorded successfully."})
    } catch (error) {
        return res.status().json({
            massage: ""
        });
    }
});



export default questionsRouter