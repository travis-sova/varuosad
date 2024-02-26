function fetchSpareParts(name = '', sn = '', page = 1) {
    // Define your query parameters
    let params = new URLSearchParams({
        name: name,
        sn: sn,
        page: page
    });

    // Fetch data from the server with query parameters
    fetch(`http://localhost:3300/spare-parts?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            // Get the div to display the data
            const sparePartsDiv = document.getElementById('spare-parts');

            // Clear any previous data
            sparePartsDiv.innerHTML = '';

            // Create a list to display the data
            const list = document.createElement('ul');

            // Add each spare part to the list
            data.forEach(sparePart => {
                const listItem = document.createElement('li');
                listItem.textContent = `${sparePart.name}, Hind: ${sparePart.hind_km}, SN: ${sparePart.sn}`;
                list.appendChild(listItem);
            });

            // Add the list to the div
            sparePartsDiv.appendChild(list);
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('search-form').addEventListener('submit', function (event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the values of the input fields
    const name = document.getElementById('name').value;
    const sn = document.getElementById('sn').value;

    // Fetch the spare parts with the input values
    fetchSpareParts(name, sn);
});

// Fetch the first page of spare parts when the page loads
fetchSpareParts();