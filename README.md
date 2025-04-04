# Image Compression & Analytics App

A MERN stack application for image compression and analytics tracking.

## Features

- Image upload and compression
- Analytics dashboard with charts
- Size reduction tracking
- User activity logging
- Responsive UI with Tailwind CSS

## Tech Stack

- Frontend: React (Vite) + Axios + Chart.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- File Upload: Multer
- Image Processing: Sharp
- Logging: Winston

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd image-compression-app
```

2. Set up the backend:
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
```

3. Set up the frontend:
```bash
cd ../client
npm install
```

4. Start MongoDB:
```bash
# Make sure MongoDB is running on your system
```

5. Start the backend server:
```bash
cd ../server
npm run dev
```

6. Start the frontend development server:
```bash
cd ../client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- POST /api/images - Upload and compress image
- GET /api/images - Get all uploaded images
- GET /api/images/:id/download - Download compressed image
- GET /api/analytics - Get compression statistics

## Environment Variables

Create a .env file in the server directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/image-compression
NODE_ENV=development
```

## License

MIT 