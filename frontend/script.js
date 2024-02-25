function scrapeAmazon() {
    const keyword = document.getElementById('keyword').value;

    // Make AJAX call to the backend
    fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`)
        .then(response => response.json())
        .then(data => {
            // Display results on the page
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <p><strong>Title:</strong> ${product.title}</p>
                    <p><strong>Rating:</strong> ${product.rating}</p>
                    <p><strong>Reviews:</strong> ${product.reviews}</p>
                    <img src="${product.image}" alt="${product.title}" />
                    <hr>
                `;
                resultsContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error(error);
            alert('Error fetching data from the server');
        });
}
