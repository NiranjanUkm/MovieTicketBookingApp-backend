const jwt = require('jsonwebtoken');

// Function to decode token payload
function decodeToken(token) {
    const decoded = jwt.decode(token);
    console.log("Decoded payload:", decoded); // Log to check the structure
    return decoded;
}

// Example usage
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTkyZmM3MThmZTE5NzU3Y2Y4MWE0NSIsImlhdCI6MTcyOTk1MDI1MSwiZXhwIjoxNzMyNTQyMjUxfQ.UFnpmuHkJkdV46Lyz9yAAuGLrrC-WcfQ_WMURgDbUCA"; // Replace this with your actual token
decodeToken(token);
