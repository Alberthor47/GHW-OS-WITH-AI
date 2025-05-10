const fs = require('fs');
const path = require('path');

// Function to generate random data and update the data file
function generateData(length, minValue, maxValue, filePath) {
  if (length <= 0 || minValue >= maxValue) {
    console.error('Invalid parameters for data generation.');
    return;
  }

  // Generate random data
  const data = Array.from({ length }, () => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
  const dataFilePath = filePath || path.join(__dirname, 'data.txt');

  fs.writeFile(dataFilePath, data.join(','), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to the data file:', err);
      return;
    }
    console.log('Data file updated successfully!');
  });
}

// Export the function for use in the main file
module.exports = { generateData };