# 🚀 Page Pulse

> A modern MERN stack web application that audits any website URL and generates a quick SEO & webpage analysis report.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

Page Pulse is a full-stack MERN application that analyzes any publicly accessible website URL and provides useful webpage insights such as:

- HTTP Status
- Response Time
- Page Title
- Meta Description
- H1 Count
- Image Count
- Images Missing Alt Text
- Approximate Word Count

The project was built as part of the **Digital Heroes Software Development Internship Assignment**.

---

## ✨ Features

### Backend

- Accepts any valid website URL
- Fetches webpage content using Axios
- Parses HTML using Cheerio
- Returns structured JSON response
- Handles:
  - Invalid URLs
  - Network failures
  - Timeouts
  - Non-HTML responses
  - Website errors (403, 404, 500)

### Frontend

- Clean and modern UI
- URL validation before API request
- Loading state
- Error handling
- Responsive design
- Website favicon
- Copy report button
- Open website button
- Color-coded HTTP Status
- Color-coded Response Time
- Character count for Title & Meta Description

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend

- Node.js
- Express.js
- Axios
- Cheerio
- CORS
- dotenv

### Testing

- Vitest

---

# 📂 Project Structure

```text
page-pulse
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── services
│   │   ├── audit.service.js
│   │   └── parseHtml.js
│   ├── tests
│   │   └── parseHtml.test.js
│   ├── utils
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/your-username/page-pulse.git

cd page-pulse
```

---

## 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000
```

Start the backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open another terminal.

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 🧪 Running Tests

The HTML parsing logic is tested using **Vitest**.

Run:

```bash
cd backend

npm test
```

Current tests include:

- ✅ Happy Path
- ✅ Missing Title & Meta Description
- ✅ Empty HTML

---

# 🔌 API Endpoint

## Analyze Website

### POST

```
/api/analyze
```

---

## Request

```json
{
  "url": "https://example.com"
}
```

---

## Success Response

```json
{
  "success": true,
  "data": {
    "status": 200,
    "responseTime": 182,
    "title": "Example Domain",
    "metaDescription": "Example website",
    "h1Count": 1,
    "imageCount": 2,
    "missingAltImages": 1,
    "wordCount": 243
  }
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Website not found. Please check the URL."
}
```

---

# 🧠 Design Decisions

## 1. Separated Fetching and Parsing Logic

The project separates webpage fetching (`auditWebsite`) from HTML parsing (`parseHtml`).

### Why?

- Easier to test
- Cleaner code
- Single responsibility for each function

---

## 2. Consistent API Response Structure

Every API response follows the same format.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Failure:

```json
{
  "success": false,
  "message": ""
}
```

### Why?

This makes frontend error handling simple and predictable.

---

## 3. Frontend URL Validation

The frontend validates URLs before sending a request to the backend.

### Why?

- Better user experience
- Fewer unnecessary API requests
- Faster feedback

---

# 🚨 Error Handling

The application gracefully handles:

- Invalid URL
- Empty URL
- Request timeout
- Website not found
- Network failure
- Unsupported content type
- HTTP 403
- HTTP 404
- HTTP 500

The server always returns meaningful error messages instead of crashing.

---

# 📸 Screenshots

## Home Page

> _Add screenshot here_

---

## Audit Report

> _Add screenshot here_

---

## Error State

> _Add screenshot here_

---

# 🚀 Future Improvements

If more development time were available, the following enhancements could be added:

- Export report as PDF
- Recent search history
- Dark mode
- Lighthouse integration
- Performance scoring
- JavaScript-rendered page support using Playwright or Puppeteer
- SEO suggestions based on audit results
- Authentication and saved reports

---

# 📚 Learning Outcomes

This project helped me strengthen my understanding of:

- REST API development
- Express.js routing
- Axios HTTP requests
- HTML parsing using Cheerio
- React state management
- API integration
- Error handling
- Responsive UI design
- Component-based architecture
- Writing unit tests using Vitest

---

# ⚠️ Known Limitations

Some websites use anti-bot protection or services such as Cloudflare.

These websites may block automated HTTP requests and return a **403 Forbidden** response.

This project handles those cases gracefully by displaying a user-friendly error message.

---

# 👨‍💻 Author

**Rohan Koriya**

- GitHub: https://github.com/RohanKoriya
- LinkedIn: https://linkedin.com/in/rohankoriya

---

# 🙏 Acknowledgements

Built as part of the **Digital Heroes Software Development Internship Assignment**.

Special thanks to the Digital Heroes team for designing a practical assignment that encouraged clean architecture, testing, and user-focused development.
