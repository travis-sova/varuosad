const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3300;

let data = [];

app.use(cors());

// Loe CSV failist andmed mällu
fs.createReadStream('LE.txt')
    .pipe(csv({ separator: '\t' }))
    .on('data', (row) => {
        data.push(row);
    })
    .on('end', () => {
        console.log(data)
        console.log('CSV failist andmete lugemine lõpetatud');
        console.log(`Server töötab aadressil http://localhost:${PORT}/spare-parts`);
    })
    .on('error', (err) => {
        console.error('Error faili lugemisel:', err);
    });

app.get('/spare-parts', (req, res) => {
    const { name, sn, page = 1, limit = 30 } = req.query;

    let filteredData = data;

    // Apply search filters if name or sn is provided
    if (name || sn) {
        filteredData = data.filter((item) => {
            let itemNameExists = item.name && typeof item.name === 'string';
            let itemSnExists = item.sn && typeof item.sn === 'string';

            return (
                (!name || (itemNameExists && item.name.toLowerCase().includes(name.toLowerCase()))) &&
                (!sn || (itemSnExists && item.sn.toLowerCase().includes(sn.toLowerCase())))
            );
        });
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = filteredData.slice(startIndex, endIndex);

    res.json(results);

    console.log('Päring:', req.query);
});

app.listen(PORT, () => {
    console.log(`Server käivitatud`);
});
