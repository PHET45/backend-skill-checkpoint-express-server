import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const questionsRouter = Router()

questionsRouter.post("/",async(req, res) => {
    const { title, description, category } = req.body || {};
    if (
        typeof title !== "string" || title.trim() === "" ||
        typeof description !== "string" || description.trim() === "" ||
        typeof category !== "string" || category.trim() === ""
    ) {
        return res.status(400).json({ massage: "Invalid request data." });
    }
    try {
        await connectionPool.query(
            `
            insert into questions (title, description, category)
            values ($1, $2, $3)
            `,
            [title, description, category]
        );
        return res.json({massage: "Question created successfully."})
    } catch (error) {
        console.error("Create question error:", error);
        return res.status(500).json({
            massage: "Unable to create question."
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
    if (
        (title !== undefined && (typeof title !== "string" || title.trim() === "")) ||
        (category !== undefined && (typeof category !== "string" || category.trim() === ""))
    ) {
        return res.status(400).json({ massage: "Invalid search parameters." });
    }
    try {
        results = await connectionPool.query(
            `
            select * from questions 
            where
                (
                    ($1::text is null or $1::text = '')
                    and ($2::text is null or $2::text = '')
                )
                or (title ilike '%' || $1::text || '%')
                or (category ilike '%' || $2::text || '%');
            `,
            [title, category]
        )
    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({
            massage: "Unable to fetch questions.",
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

questionsRouter.put("/:questionId", async(req, res) => {
    const questionIdFromClient = req.params.questionId
    const updatedQuestion = {...req.body, updated_at: new Date() }; 

    if (
        typeof updatedQuestion.title !== "string" || updatedQuestion.title.trim() === "" ||
        typeof updatedQuestion.description !== "string" || updatedQuestion.description.trim() === "" ||
        typeof updatedQuestion.category !== "string" || updatedQuestion.category.trim() === ""
    ) {
        return res.status(400).json({ massage: "Invalid request data." });
    }
    try {
        const results = await connectionPool.query(
            `
            update questions
            set title = $2,
                description = $3,
                category = $4
            where id = $1
        `,
        [
            questionIdFromClient,
            updatedQuestion.title,
            updatedQuestion.description,
            updatedQuestion.category,
        ]
    );

        if(results.rowCount === 0){
            return res.status(404).json({
                massage: "Question not found."
            });
        }
        return res.json({massage: "Question updated successfully."})
    } catch (error) {
        return res.status(500).json({
            massage: "Unable to update question."
        });
    }
});

questionsRouter.delete("/:questionId", async(req, res) => {
    const rawId = req.params.questionId;
    try {
        const result = await connectionPool.query(
            `
            delete from questions where id = $1
            `,
            [rawId]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({
                massage: "Question not found."
            });
        }
        return res.json({ massage: "Question post has been deleted successfully." })
    } catch (error) {
        return res.status(500).json({
            massage: "Unable to delete question."
        });
    }
});



questionsRouter.post("/:questionId/answers", async(req, res) => {
    const questionIdFromClient = req.params.questionId
    const { content } = req.body || {}

    if (typeof content !== "string" || content.trim() === "") {
        return res.status(400).json({ massage: "Invalid request data." });
    }
    try {
        
        const questionExists = await connectionPool.query(
            `select 1 from questions where id = $1`,
            [questionIdFromClient]
        )
        if (questionExists.rows.length === 0) {
            return res.status(404).json({ massage: "Question not found." });
        }

        // Create the answer
            await connectionPool.query(
            `
            insert into answers (question_id, content)
            values ($1, $2)
            returning id, question_id, content
            `,
            [questionIdFromClient, content]
        )

        return res.json({
            massage: "Answer created successfully.",
        })
    } catch (error) {
        console.error("Create answer error:", error);
        return res.status(500).json({
            massage: "Unable to create answer."
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

questionsRouter.delete("/:questionId/answers", async (req, res) => {
    try {
        const questionIdFromClient = req.params.questionId;
        // ตรวจสอบว่าคำถามมีอยู่จริงหรือไม่
        const questionCheck = await connectionPool.query(
            `SELECT * FROM questions WHERE id=$1`,
            [questionIdFromClient]
        );

        if (!questionCheck.rows[0]) {
            return res.status(404).json({
                message: "Question not found."
            });
        }
        // ลบคำตอบทั้งหมดของคำถาม
        await connectionPool.query(
            `DELETE FROM answers WHERE question_id=$1`,
            [questionIdFromClient]
        );

        return res.json({ message: "All answers for the question have been deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Unable to delete answers."
        });
    }
});


questionsRouter.post("/:qurstionId/vote", async(req, res) => {
    try {
        return res.json({massage: "Vote on the question has been recorded successfully."})
    } catch (error) {
        return res.status(500).json({
            massage: "Unable to vote question."
        });
    }
});



export default questionsRouter