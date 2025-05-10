const fs = require('fs');
const path = require('path');
const dataGenerator = require('./dataGeneration');

function main() {
    // Example usage of the data generation function
    const length = 100; // Number of data points
    const minValue = -10; // Minimum value for data points
    const maxValue = 500; // Maximum value for data points

    // Read data from a txt file
    const dataFilePath = path.join(__dirname, 'data.txt');
    const htmlFilePath = path.join(__dirname, 'graph.html');

    dataGenerator.generateData(length, minValue, maxValue, dataFilePath);

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Process data (assuming comma-separated values)
        const values = data.split(',').map(Number);

        // Generate a simple HTML file with graphs
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Graph</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
            <h1>Graph Visualization</h1>
            <canvas id="myChart" width="400" height="200"></canvas>
            <script>
                const ctx = document.getElementById('myChart').getContext('2d');
                const data = ${JSON.stringify(values)};
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.map((_, index) => 'Point ' + (index + 1)),
                        datasets: [{
                            label: 'Data Points',
                            data: data,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Index'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Value'
                                }
                            }
                        }
                    }
                });
            </script>
        </body>
        </html>
        `;

        // Write the HTML content to a file
        fs.writeFile(htmlFilePath, htmlContent, (err) => {
            if (err) {
                console.error('Error writing the HTML file:', err);
                return;
            }
            console.log('Graph HTML file created successfully:', htmlFilePath);
        });
    });
};

main();

module.exports = { main };
