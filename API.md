# API Documentation

## Endpoints

### POST /api/results
Save test result to database.

**Request Body:**
```json
{
  "userId": "string",
  "username": "string",
  "wpm": 85,
  "accuracy": 97.5,
  "consistency": 92,
  "duration": 60,
  "errors": 5,
  "mode": "time",
  "testType": "60s Sprint"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Test result saved",
  "id": "507f1f77bcf86cd799439011"
}
```

### GET /api/results?userId=xxx&limit=50
Get user test results.

**Response:**
```json
{
  "results": [
    {
      "wpm": 85,
      "accuracy": 97.5,
      "date": 1705334400000
    }
  ]
}
```

### GET /api/profile
Get user profile.

**Response:**
```json
{
  "username": "Guest",
  "bestWpm": 85,
  "totalTests": 10
}
```

---

**Contact**: zetfounder@gmail.com
