fetch('http://localhost:3300/spare-parts')
  .then(response => response.json())
  .then(data => {
    // Now data is the data from your server
    // You can display it in your web page
    console.log(data);
    // For example, if you want to display it in a div with id 'dataDiv':
    document.getElementById('dataDiv').textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => console.error('Error:', error));