const fs = require('fs');
const csv = require('csv-parser');

// Function to filter and write data to a file
function filterAndWriteData(inputFile, outputFileName, filterCountry) {
  const outputStream = fs.createWriteStream(outputFileName);

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
      if (row.country.toLowerCase() === filterCountry.toLowerCase()) {
        outputStream.write(`${row.country},${row.year},${row.population}\n`);
      }
    })
    .on('end', () => {
      outputStream.end();
      console.log(`Data for ${filterCountry} written to ${outputFileName}`);
    });
}

// Delete existing files if they exist
try {
  fs.unlinkSync('canada.txt');
  console.log('canada.txt deleted');
} catch (err) {}

try {
  fs.unlinkSync('usa.txt');
  console.log('usa.txt deleted');
} catch (err) {}

// Filter and write data for Canada
filterAndWriteData('input_countries.csv', 'canada.txt', 'Canada');

// Filter and write data for United States
filterAndWriteData('input_countries.csv', 'usa.txt', 'United States');
