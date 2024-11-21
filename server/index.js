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

// API routes
const routeClient = require("./routes/client/index.route.js");
const routeAdmin = require("./routes/admin/index.route.js");
routeClient(app);
routeAdmin(app);


//Khởi tạo và kết nối database
const database = require("../server/config/database.js");
database.connect();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});   

