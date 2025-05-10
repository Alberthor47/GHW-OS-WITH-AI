const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Test for main.js
const dataFilePath = path.join(__dirname, '../data.txt');
const htmlFilePath = path.join(__dirname, '../graph.html');

// Run the main script
exec('node ./main.js', (err, stdout, stderr) => {
  if (err) {
    console.error('Test failed: Error executing main.js.', err);
    return;
  }

  console.log('Main.js executed successfully.');

  // Verify the data file exists
  if (!fs.existsSync(dataFilePath)) {
    console.error('Test failed: Data file was not created.');
    return;
  }

  console.log('Data file exists.');

  // Verify the HTML file exists
  if (!fs.existsSync(htmlFilePath)) {
    console.error('Test failed: HTML file was not created.');
    return;
  }

  console.log('HTML file exists.');

  console.log('Test passed.');
});