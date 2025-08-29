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

// Helper function to check if string contains any letters
function hasLetters(str) {
  return /[a-zA-Z]/.test(str);
}

// Helper function to check if string contains special characters
function hasSpecialChars(str) {
  return /[^a-zA-Z0-9]/.test(str);
}

// Main processing function for data array
function processData(dataArray) {
  if (!Array.isArray(dataArray)) {
    throw new Error("Input must be an array");
  }

  const even_numbers = [];
  const odd_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;
  let allLetters = [];

  for (const item of dataArray) {
    // Ensure item is string for consistent processing
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
    } else {
      // Non-numeric item - check if it has letters
      if (hasLetters(itemStr)) {
        // Item contains letters - add to alphabets
        alphabets.push(itemStr.toUpperCase());

        // Extract letters for concatenation
        for (const char of itemStr) {
          if (hasLetters(char)) {
            allLetters.push(char);
          }
        }
      }

      // Check for special characters in the item
      if (hasSpecialChars(itemStr)) {
        // Item contains special characters
        for (const char of itemStr) {
          if (hasSpecialChars(char) && !special_characters.includes(char)) {
            special_characters.push(char);
          }
        }
      }
    }
  }

  // Generate reverse concatenation with alternating caps
  let concatString = "";
  if (allLetters.length > 0) {
    // Reverse the order of letters
    const reversedLetters = allLetters.reverse();

    // Apply alternating capitalization based on even/odd index
    reversedLetters.forEach((letter, index) => {
      if (index % 2 === 0) {
        // Even index: uppercase
        concatString += letter.toUpperCase();
      } else {
        // Odd index: lowercase
        concatString += letter.toLowerCase();
      }
    });
  }

  return {
    even_numbers,
    odd_numbers,
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

    // Build response object
    const response = {
      is_success: true,
      ...USER_DETAILS,
      ...result
    };

    res.status(200).json(response);

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