const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// User details (as per your specifications)
const USER_DETAILS = {
  user_id: "arin_balyan_19042004",
  email: "arinbalyan19@gmail.com",
  roll_number: "22BAI0041"
};

// Helper function to check if string contains only digits
function isNumeric(str) {
  return /^\d+$/.test(str);
}

// Main processing function for data array
function processData(dataArray) {
  if (!Array.isArray(dataArray)) {
    throw new Error("Input must be an array");
  }

  const odd_numbers = [];
  const even_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;
  let allAlphabets = []; // Store all alphabetic characters for concatenation

  for (const item of dataArray) {
    const itemStr = String(item);

    if (isNumeric(itemStr)) {
      // Pure numeric item
      const num = parseInt(itemStr, 10);
      sum += num;

      if (num % 2 === 0) {
        even_numbers.push(itemStr);
      } else {
        odd_numbers.push(itemStr);
      }
    } else if (/[a-zA-Z]/.test(itemStr)) {
      // Item contains letters - add to alphabets (convert to uppercase)
      alphabets.push(itemStr.toUpperCase());

      // Extract all individual letters for concatenation (preserve original case)
      for (const char of itemStr) {
        if (/[a-zA-Z]/.test(char)) {
          allAlphabets.push(char);
        }
      }
    } else {
      // Check for special characters
      for (const char of itemStr) {
        if (/[^a-zA-Z0-9]/.test(char) && !special_characters.includes(char)) {
          special_characters.push(char);
        }
      }
    }
  }

  // Generate reverse concatenation with alternating caps
  let concatString = "";
  if (allAlphabets.length > 0) {
    // Reverse the order of alphabetic characters
    const reversedAlphabets = allAlphabets.reverse();

    // Apply alternating capitalization
    reversedAlphabets.forEach((char, index) => {
      if (index % 2 === 0) {
        // Even index: uppercase
        concatString += char.toUpperCase();
      } else {
        // Odd index: lowercase
        concatString += char.toLowerCase();
      }
    });
  }

  return {
    is_success: true,
    ...USER_DETAILS,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string: concatString
  };
}

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // Input validation
    if (!data) {
      return res.status(400).json({
        is_success: false,
        message: "Missing 'data' field in request body"
      });
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "'data' field must be an array"
      });
    }

    // Process the data
    const result = processData(data);

    res.status(200).json(result);

  } catch (error) {
    console.error('Error processing request:', error.message);

    res.status(500).json({
      is_success: false,
      message: error.message || "Internal server error"
    });
  }
});

// Get endpoint (optional - useful for testing)
app.get('/bfhl', (req, res) => {
  res.status(405).json({
    is_success: false,
    message: "Method GET not allowed. Use POST method with data array in request body."
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    is_success: true,
    message: "BFHL API Server is running",
    available_endpoints: ["POST /bfhl"]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    is_success: false,
    message: "Internal server error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    message: "Endpoint not found. Available endpoints: POST /bfhl"
  });
});

app.listen(PORT, () => {
  console.log(`BFHL API Server running on port ${PORT}`);
  console.log(`Local URL: http://localhost:${PORT}`);
  console.log(`POST endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
