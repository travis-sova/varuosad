const fs = require('fs');
const csv = require('csv-parser');

// Array to store the CSV data
let data = [];


// Read the CSV file
fs.createReadStream('LE.txt')
  .pipe(csv())
  .on('data', (row) => {
    // Process each row
    data.push(row);
  })
  .on('end', () => {
    // All rows have been processed
    console.log('CSV file successfully processed.');
    // Here you can use the 'data' array containing your CSV data
    console.log(data);
  })
  .on('error', (err) => {
    // Handle errors
    console.error('Error encountered while reading the CSV file:', err);
  });