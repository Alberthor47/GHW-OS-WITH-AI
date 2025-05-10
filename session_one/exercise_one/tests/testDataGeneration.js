const dataGenerator = require('../dataGeneration');
const fs = require('fs');
const path = require('path');

// Test for dataGeneration.js
const testDataFilePath = path.join(__dirname, '../data.txt');

// Test parameters
const length = 5;
const minValue = 1;
const maxValue = 10;

dataGenerator.generateData(length, minValue, maxValue);

// Verify the data file content
fs.readFile(testDataFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Test failed: Unable to read data file.', err);
    return;
  }

  const values = data.split(',').map(Number);
  if (values.length === length && values.every(val => val >= minValue && val <= maxValue)) {
    console.log('Test passed: Data file contains valid random values.');
  } else {
    console.error('Test failed: Data file contains invalid values.');
  }
});