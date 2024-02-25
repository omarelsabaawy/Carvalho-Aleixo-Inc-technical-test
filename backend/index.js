const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint for scraping Amazon search results
app.get('/api/scrape', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

        // Fetch HTML content from the Amazon search results page
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extract product details
        const products = [];
        $('.s-result-item').each((element) => {
            const title = $(element).find('h2 span').text();
            const rating = $(element).find('.a-icon-star .a-icon-alt').text();
            const reviews = $(element).find('.s-item .a-size-base').first().text();
            const image = $(element).find('.s-image').attr('src');

            products.push({ title, rating, reviews, image });
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
