const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const apiRoutes = require("./src/routes/api");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Kết nối Database (Cách viết cho Serverless)
const MONGODB_URI = process.env.MONGODB_URI;
if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Kết nối MongoDB thành công"))
    .catch((err) => console.error("Lỗi kết nối MongoDB:", err));
}

// Routes
app.use("/api", apiRoutes);

// Mock AI logic (Rút gọn để chạy ổn định)
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY || "");
// Lưu ý: Nhớ thêm GEMINI_API_KEY vào Environment Variables trên Vercel

app.post("/api/chat", async (req, res) => {
  // ... Giữ nguyên logic chat của bạn ...
});

// QUAN TRỌNG: Bỏ phần Socket.io và server.listen()
// Vercel sẽ tự động điều phối qua module.exports
module.exports = app;
