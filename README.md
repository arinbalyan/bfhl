# Bajaj Finserv Health API

A RESTful API built in Node.js for the BFHL (Bajaj Finserv Health Limited) coding challenge.

## 🚀 Features

- **POST /bfhl** endpoint for data processing
- Comprehensive data categorization (numbers, alphabets, special characters)
- Smart categorization logic for mixed content items
- Reverse concatenation with alternating case logic
- Built-in error handling and input validation
- CORS enabled for cross-origin requests

## 📋 API Specification

### Endpoint: `POST /bfhl`

#### Request Format
```json
{
  "data": ["array", "of", "mixed", "items"]
}
```

#### Response Format
```json
{
  "is_success": true,
  "user_id": "arin_balyan_19042004",
  "email": "arinbalyan19@gmail.com",
  "roll_number": "22BAI0041",
  "even_numbers": ["2", "4", "92"],
  "odd_numbers": ["1", "5"],
  "alphabets": ["A", "BC", "DEF"],
  "special_characters": ["&", "-", "*"],
  "sum": "104",
  "concat_string": "eOdDcB"
}
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Start in development mode:
   ```bash
   npm run dev
   ```

### Local Development
- Server runs on port 3000 by default
- Local URL: `http://localhost:3000`
- API Endpoint: `http://localhost:3000/bfhl`

## 🧪 Testing Examples

### Example A
```bash
curl -X POST "http://localhost:3000/bfhl" \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R", "$"]}'
```

Expected Response:
```json
{
  "is_success": true,
  "user_id": "arin_balyan_19042004",
  "email": "arinbalyan19@gmail.com",
  "roll_number": "22BAI0041",
  "even_numbers": ["334", "4"],
  "odd_numbers": ["1"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### Example B
```bash
curl -X POST "http://localhost:3000/bfhl" \
  -H "Content-Type: application/json" \
  -d '{"data": ["2","a","y","4","&","-","*","5","92","b"]}'
```

### Example C
```bash
curl -X POST "http://localhost:3000/bfhl" \
  -H "Content-Type: application/json" \
  -d '{"data": ["A","ABcD","DOE"]}'
```

## ⚙️ Logic Implementation

### Data Categorization Rules
1. **Numeric Items**: Pure digit strings (e.g., "123", "45") → categorized as even/odd numbers
2. **Alpha Items**: Items containing at least one letter (e.g., "ABC", "a1b") → converted to uppercase
3. **Special Items**: Items containing special characters (e.g., "@", "$", "#") → stored as-is
4. **Multiple Categories**: Items with both letters and specials are categorized under both

### Reverse Concatenation Algorithm
1. Extract all alphabetical characters from input items
2. Reverse the character order
3. Apply alternating capitalization:
   - Even indices: Uppercase
   - Odd indices: Lowercase

Example: ["a", "R"] → "aR" → reverse "Ra" → result "Ra"

### Sum Calculation
- Pure numeric strings are converted to numbers and summed
- Result returned as string for consistency

## 🛠️ Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `is_success` | Boolean | Operation status (always true for valid requests) |
| `user_id` | String | Unique user identifier (name_ddmmyyyy format) |
| `email` | String | User email address |
| `roll_number` | String | College roll number |
| `even_numbers` | Array | Even numeric strings |
| `odd_numbers` | Array | Odd numeric strings |
| `alphabets` | Array | Uppercased alphabet strings |
| `special_characters` | Array | Special character strings |
| `sum` | String | Sum of all numeric values|
| `concat_string` | String | Reverse concatenation with alternating caps |

## 🚀 Deployment

The API is designed for deployment on cloud platforms like Vercel, Render, or Railway.

### Vercel Deployment Steps
1. Create a Vercel account
2. Connect your GitHub repository
3. Set build command: `npm run build` (if using custom build)
4. Set start command: `npm start`
5. Deploy

### Environment Variables (Optional)
```env
PORT=3000
NODE_ENV=production
```

## 📝 Project Structure

```
bajajfineserv-vit/
├── index.js           # Main application file
├── package.json       # Project dependencies
├── README.md          # Project documentation
└── node_modules/      # Dependencies
```

## 🛡️ Error Handling

The API includes comprehensive error handling for:
- Missing or invalid request body
- Non-array data fields
- Malformed JSON requests
- Internal server errors

All errors return consistent JSON format with `is_success: false`.

## 📚 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, Body Parser
- **Deployment**: Vercel (recommended)

## 🤝 Contributing

This is a BFHL coding challenge submission. For any questions or improvements, please create an issue or pull request.

## 📧 Contact

**Arin Balyan**
- Email: arinbalyan19@gmail.com
- Roll Number: 22BAI0041
- User ID: arin_balyan_19042004