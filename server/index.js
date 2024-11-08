const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Cấu hình CORS
const corsOptions = {
  origin: 'http://localhost:3000', // URL của frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const route = require("./routes/client/index.route.js");

// API routes
route(app);

//Khởi tạo và kết nối database
const database = require("../server/config/database.js");
database.connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});