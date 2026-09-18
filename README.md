# Hướng dẫn chạy các project 4, 5, 6

## 1. Yêu cầu chuẩn bị

- Cài đặt Node.js và npm
- Mở terminal ở thư mục gốc của workspace: `D:\Java_FullStack\Front-end`
- Nếu chưa cài package, chạy lệnh `npm install` ở từng folder cần chạy

> Lưu ý: project 5 và project 6 gồm 2 phần: backend JSON Server và frontend React. Cần khởi động cả hai phần.

---

## 2. Project 4

Project 4 là dạng frontend tĩnh + API giả lập bằng `json-server`.

### Bước 1: Khởi động API

```bash
cd project_4/project-3
npm install
npm start
```

`npm start` sẽ chạy JSON Server để phục vụ dữ liệu từ file `database.json`.

### Bước 2: Mở giao diện frontend

- Mở file `project_4/index.html` bằng trình duyệt hoặc dùng Live Server trong VS Code
- Nếu dùng Live Server, hãy mở folder `project_4` và chạy `Open with Live Server`

### Lưu ý

- API của project 4 chạy theo `json-server` trên port mặc định `3000`
- Nếu bạn mở file HTML trực tiếp bằng browser, có thể gặp lỗi đường dẫn vì project này đang dùng cấu hình đường dẫn tuyệt đối. Nên ưu tiên dùng Live Server để chạy đúng môi trường

---

## 3. Project 5

Project 5 có 2 thành phần:

- `project-5/database`: JSON Server
- `project-5/quizz`: React app

### Bước 1: Khởi động backend

```bash
cd project-5/database
npm install
npm start
```

Backend sẽ chạy ở port `3001` do script đã cấu hình:

```json
"start": "json-server -p 3001 --watch database.json"
```

### Bước 2: Khởi động frontend

Mở terminal mới:

```bash
cd project-5/quizz
npm install
npm start
```

React app sẽ chạy ở port `3000` mặc định. Mở browser tại:

```text
http://localhost:3000
```

### Kiểm tra

- API: `http://localhost:3001`
- Frontend: `http://localhost:3000`

---

## 4. Project 6

Project 6 cũng có 2 phần:

- `project-6/database`: JSON Server
- `project-6/laptopshop`: React app

### Bước 1: Khởi động backend

```bash
cd project-6/database
npm install
npm start
```

Backend chạy trên port `3001`.

### Bước 2: Khởi động frontend

Mở terminal mới:

```bash
cd project-6/laptopshop
npm install
npm start
```

React app sẽ chạy ở port `3000` mặc định. Mở browser tại:

```text
http://localhost:3000
```

### Kiểm tra

- API: `http://localhost:3001`
- Frontend: `http://localhost:3000`

---

## 5. Luồng chạy nhanh

### Project 4

```bash
cd project_4/project-3
npm install
npm start
```

Sau đó mở `project_4/index.html` bằng Live Server.

### Project 5

```bash
cd project-5/database
npm install
npm start
```

```bash
cd project-5/quizz
npm install
npm start
```

### Project 6

```bash
cd project-6/database
npm install
npm start
```

```bash
cd project-6/laptopshop
npm install
npm start
```

---

## 6. Nếu gặp lỗi phổ biến

### Lỗi port đã được sử dụng

- Tắt tiến trình cũ hoặc đổi port trong file `package.json`
- Ví dụ nếu React báo port 3000 đang chiếm dụng, hãy chọn port khác

### Lỗi `node_modules` chưa có

```bash
npm install
```

### Lỗi API không load dữ liệu

- Kiểm tra backend đã chạy chưa
- Kiểm tra URL API trong frontend có đúng `http://localhost:3001` hay không

---

## 7. Tổng kết

- Project 4: chạy bằng `json-server` + mở HTML qua Live Server
- Project 5: chạy backend `database` rồi frontend `quizz`
- Project 6: chạy backend `database` rồi frontend `laptopshop`

Nếu cần, có thể tiếp tục bổ sung thêm hướng dẫn từng chức năng của từng project vào README này.
