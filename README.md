
# Q&A REST API

RESTful API สำหรับระบบ **คำถาม–คำตอบ (Questions & Answers System)** พัฒนาโดยใช้ **Node.js (Express.js)** และ **PostgreSQL**  
โปรเจคนี้ออกแบบมาเพื่อรองรับการสร้างคำถาม การจัดการคำถาม และการตอบคำถาม พร้อมฟังก์ชันค้นหาและลบข้อมูลได้

---

## 🚀 Features

- ✅ จัดการ **คำถาม**: สร้าง, อ่าน, ค้นหา, อัปเดต, ลบ
- ✅ จัดการ **คำตอบ**: เพิ่มคำตอบ, ดึงคำตอบทั้งหมด, ลบคำตอบทั้งหมดของคำถาม
- ✅ ค้นหาคำถามตาม **title** หรือ **category**
- ✅ รองรับการตรวจสอบ input และ error handling
- ✅ เชื่อมต่อฐานข้อมูล PostgreSQL

---

## 🛠 Tech Stack

- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) – Backend Framework
- [PostgreSQL](https://www.postgresql.org/) – Relational Database
- [pg](https://www.npmjs.com/package/pg) – PostgreSQL Client for Node.js

---

## ⚙️ Installation
```bash
1. Clone โปรเจค

git clone https://github.com/PHET45/backend-skill-checkpoint-express-server.git
cd backend-skill-checkpoint-express-server

2. ติดตั้ง dependencies
npm install

3. ตั้งค่า Environment Variables

สร้างไฟล์ .env แล้วใส่ค่าตาม PostgreSQL ของคุณ:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database

4. รันเซิร์ฟเวอร์
npm start


Server จะทำงานที่:

http://localhost:4000


ทดสอบ API:

GET http://localhost:4000/test




📝 Q&A REST API

API นี้ถูกพัฒนาด้วย Node.js + Express + PostgreSQL สำหรับสร้างและจัดการคำถาม (Questions) และคำตอบ (Answers)
เหมาะกับระบบเว็บบอร์ด / ฟอรั่ม / Q&A คล้าย StackOverflow

🚀 Features

สร้าง / อ่าน / อัปเดต / ลบ คำถาม (CRUD Questions)

เพิ่ม / อ่าน / ลบ คำตอบของแต่ละคำถาม (Answers)

ค้นหาคำถามด้วย title และ category

ระบบโหวตสำหรับ Question และ Answer

Validation ตรวจสอบ input (เช่น category ที่กำหนด, ความยาว content ของคำตอบ)

📂 Project Structure
project-root/
├── Routes/
│   ├── question.mjs       # จัดการ Questions และ Answers (บางส่วน)
│   ├── answers.mjs        # จัดการเฉพาะ Answers เช่น โหวต
├── middlewares/
│   ├── question.validation.mjs   # Middleware ตรวจสอบข้อมูล input
├── utils/
│   ├── db.mjs             # Database connection (PostgreSQL pool)
├── server.mjs             # main entrypoint

⚡ API Endpoints
🔹 Questions

POST /questions → สร้างคำถามใหม่

{
  "title": "React vs Angular",
  "description": "Which one is better for large-scale apps?",
  "category": "Software"
}


GET /questions → ดึงคำถามทั้งหมด

GET /questions/search?title=React&category=Software → ค้นหาคำถาม

GET /questions/:questionId → ดึงคำถามตาม ID

PUT /questions/:questionId → แก้ไขคำถาม

DELETE /questions/:questionId → ลบคำถาม

🔹 Answers

POST /questions/:questionId/answers → สร้างคำตอบ (จำกัด ≤ 300 ตัวอักษร)

GET /questions/:questionId/answers → ดึงคำตอบทั้งหมดของคำถาม

DELETE /questions/:questionId/answers → ลบคำตอบทั้งหมดของคำถาม

🔹 Voting

POST /questions/:questionId/vote → โหวตให้คำถาม

POST /answers/:answerId/vote → โหวตให้คำตอบ

🛡 Validation

Category ของคำถาม ต้องอยู่ในลิสต์

["Software", "Food", "Travel", "Science", "Etc", "Geography"]


คำตอบ (content) ต้องไม่เกิน 300 ตัวอักษร

