# Hướng Dẫn Sử Dụng Ứng Dụng Web

## Giới Thiệu
Ứng dụng này là một hệ thống quản lý người dùng và đặt vé máy bay, cho phép người dùng đăng ký, đăng nhập, và thực hiện các thao tác liên quan đến đặt vé. Ứng dụng được xây dựng bằng React cho frontend và Node.js với Express cho backend.

## Cài Đặt

### Yêu Cầu
- Node.js 
- MongoDB

### Cài Đặt Backend
1. Di chuyển vào thư mục `server`:
   ```bash
   cd server
   ```

2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```

3. Tạo file `.env` trong thư mục `server` và thêm các biến môi trường cần thiết:
   ```
   PORT = 5000
   MONGO_URL = mongodb://localhost:27017/q-airline
   NODE_ENV=production && node server/index.js
   ```

4. Khởi động server:
   ```bash
   npm start
   ```

### Cài Đặt Frontend
1. Di chuyển vào thư mục `client`:
   ```bash
   cd client
   ```

2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Tạo file `.env` trong thư mục `server` và thêm các biến môi trường cần thiết:
   ```
   PORT = 3000
   
4. Khởi động ứng dụng React:
   ```bash
   npm start
   ```

### Database
Đảm bảo rằng trong mongodb có database với các collection như ảnh sau:
![image](https://github.com/user-attachments/assets/7c23777d-bcff-44d6-bee4-0f372249e4bb)


