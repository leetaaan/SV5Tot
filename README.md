# SV5Tot
Dự án được xây dựng thiên về diễn đàn sinh viên 5 tốt. Được hoàn thiện trong học phần sinh Đồ án tốt nghiệp.

## .Env file
#### Frontend

| Parameter | Description                |
| :-------- | :------------------------- |
| `VITE_SERVER_DOMAIN` | **Required**. Link api với port (http://localhost:3000) |
| `VITE_CLOUDINARY_NAME` | **Required**. Name của tài khoản CloudinaryCloudinary |
| `VITE_CLOUDINARY_PRESET` | **Required**. PresetPreset của tài khoản CloudinaryCloudinary|

#### Server

| Parameter | Description                |
| :-------- | :------------------------- |
| `DB_LOCATION` | **Required**. Link kết nối với MongoDB |
| `SECRET_ACCESS_KEY` | **Required**. Key JWT |

# Bắt đầu
## 1. Chạy Server
```bash
cd server
```
```bash
$ npm start
```

## 2. Chạy Frontend
```bash
cd frontend
```
```bash
$ npm run dev
```

# Tài khoản mẫu
```python
# Admin
201146@dlu.edu.vn
LeTan12345
# User
2011436@dlu.edu.vn
LeTan12345

```
