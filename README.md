
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


Response:

"Server API is working 🚀"

📌 API Endpoints
Questions
Method	Endpoint	Description
POST	/questions	สร้างคำถามใหม่
GET	/questions	ดึงคำถามทั้งหมด
GET	/questions/search?title=xxx&category=yyy	ค้นหาคำถาม
GET	/questions/:questionId	ดึงคำถามตาม id
PUT	/questions/:questionId	อัปเดตคำถาม
DELETE	/questions/:questionId	ลบคำถาม
Answers
Method	Endpoint	Description
POST	/questions/:questionId/answers	เพิ่มคำตอบให้คำถาม
GET	/questions/:questionId/answers	ดึงคำตอบทั้งหมดของคำถาม
DELETE	/questions/:questionId/answers	ลบคำตอบทั้งหมดของคำถาม
Vote (Prototype)
Method	Endpoint	Description
POST	/questions/:questionId/vote	โหวตคำถาม (mock endpoint)
🧪 Example Usage
Create Question
POST /questions
Content-Type: application/json

{
  "title": "Express.js คืออะไร?",
  "description": "ช่วยอธิบายการทำงานของ Express.js",
  "category": "backend"
}


Response:

{ "massage": "Question created successfully." }

📂 Project Structure
project-root/
│── Routes/
│   ├── question.mjs   # Router สำหรับ Questions + Answers
│   └── answers.mjs    # Router สำหรับ Answers (แยก)
│── utils/
│   └── db.mjs         # PostgreSQL connection pool
│── index.mjs          # main server file
│── package.json
│── README.md