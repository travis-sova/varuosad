const express = require('express');
const app = express();
const cors = require('cors');

const { data } = require('./csv.js');

app.use(cors());

const PORT = 3300;
const resultsPerPage = 30;


// Load the data before setting up the routes
data().then(data => {
    // Saada andmed kasutajale JSON formaadis kasutades HTTP veebiserverit
    app.get('/spare-parts', (req, res) => {
        let page = parseInt(req.query.page) || 1;
        let startIndex = (page - 1) * resultsPerPage;
        let endIndex = page * resultsPerPage;

        let responseData = data.slice(startIndex, endIndex);

        res.json(responseData);
    });

    // Filtreeri/otsi varuosasid seerianumbri või nime järgi
    app.get('/spare-parts/search', (req, res) => {
        const { name, sn } = req.query;

        let filteredData = data.filter((item) => {
            return (
                (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
                (!sn || item.sn.toLowerCase().includes(sn.toLowerCase()))
            );
        });

        res.json(filteredData);
    });

    // Parem hinne kui teed ka lehekülgedeks jagamise ja sorteerimise
    app.get('/spare-parts/sort', (req, res) => {
        const { sort } = req.query;

        let sortedData = [...data];
        if (sort) {
            sortedData.sort((a, b) => {
                if (sort.startsWith('-')) {
                    return b[sort.substring(1)] - a[sort.substring(1)];
                } else {
                    return a[sort] - b[sort];
                }
            });
        }

        res.json(sortedData);
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});