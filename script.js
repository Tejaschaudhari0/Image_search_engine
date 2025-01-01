const searchButton = document.getElementById('search-button');
const showMoreButton = document.getElementById('show-more');
const searchBar = document.getElementById('search-bar');
const imageResults = document.getElementById('image-results');

const accessKey = 'vdwl9J__6uJ6vAVKRFYZlmPWNehKHb3M-bjlnR0XyOw'; // Your Unsplash API Key
let currentPage = 1; // Track the current page
let currentQuery = ''; // Track the current search term

// Function to fetch images
async function fetchImages(query, page = 1) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${accessKey}&per_page=9`;
    const response = await fetch(url);

    if (!response.ok) {
        alert('Error fetching images. Please try again.');
        return;
    }

    const data = await response.json();
    displayImages(data.results);

    // Show the "Show More" button if more pages are available
    if (data.total_pages > page) {
        showMoreButton.style.display = 'block';
    } else {
        showMoreButton.style.display = 'none';
    }
}

// Function to display images
function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small; // Use small size image
        imgElement.alt = image.alt_description || 'Image';
        imageResults.appendChild(imgElement);
    });
}

// Handle search button click
searchButton.addEventListener('click', () => {
    const query = searchBar.value.trim();
    if (query) {
        currentQuery = query; // Update the current search term
        currentPage = 1; // Reset to the first page
        imageResults.innerHTML = ''; // Clear previous results
        fetchImages(query, currentPage);
    } else {
        alert('Please enter a search term');
    }
});

// Handle "Show More" button click
showMoreButton.addEventListener('click', () => {
    currentPage += 1; // Increment the page number
    fetchImages(currentQuery, currentPage); // Fetch the next page of results
});