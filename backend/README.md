# SRM Faculty Backend API

Express.js + MongoDB backend for the SRM Faculty Management System.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB
Edit `.env` to set your MongoDB connection:
```
MONGODB_URI=mongodb://localhost:27017/srm-faculty
PORT=5000
NODE_ENV=development
```

**Options:**
- **Local MongoDB:** Install MongoDB and run `mongod`
- **MongoDB Atlas:** Replace with your Atlas connection string: `mongodb+srv://user:password@cluster.mongodb.net/srm-faculty`

### 3. Start Backend Server
```bash
npm start
```
Or for development with auto-reload:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Faculty Management
- `GET /api/faculty` - Get all faculty records
- `GET /api/faculty/:id` - Get specific faculty record
- `POST /api/faculty/upload` - Add new faculty with optional file upload
- `PUT /api/faculty/:id` - Update faculty record
- `DELETE /api/faculty/:id` - Delete faculty record

### File Operations
- `GET /api/download/:filename` - Download uploaded file

### Health Check
- `GET /api/health` - Check if API is running

## Example Upload Request
```javascript
const formData = new FormData();
formData.append('name', 'Dr. John Doe');
formData.append('department', 'Computer Science');
formData.append('workStatus', 'completed');
formData.append('percentage', 85);
formData.append('file', fileInput.files[0]); // Optional

fetch('http://localhost:5000/api/faculty/upload', {
    method: 'POST',
    body: formData
});
```

## Features
✅ Express.js with security (helmet, CORS)
✅ MongoDB integration with mongoose
✅ File upload (PDF, Excel, CSV - max 5MB)
✅ CRUD operations for faculty data
✅ Error handling and validation
✅ Environment configuration with dotenv

## Ports
- **Frontend:** http://localhost:8000 (Python server)
- **Backend:** http://localhost:5000 (Node.js)

## Troubleshooting
- **Connection refused:** Ensure MongoDB and Node.js server are running
- **File upload fails:** Check `uploads/` folder permissions
- **CORS errors:** Verify `CORS_ORIGIN` includes your frontend URL in `.env`
