// Function to load data based on category ID (default is 1000)
function loadData(id = 1000) {
    // Fetch data from an API based on the category ID
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then(res => res.json()) // Parse the response as JSON
        .then(data => displayData(data)); // Call the displayData function with the retrieved data
}

// Function to display data on the web page
const displayData = (data => {
    const allCard = data.data; // Extract the data array

    // Function to convert seconds to hours and minutes
    function secToHouAndMi(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        return { hours, minutes };
    }

    // Get references to DOM elements
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ''; // Clear existing content
    const element = document.getElementById('drawing');
    element.classList.add('hidden'); // Hide the drawing section
    const copy = document.getElementById('copy');
    copy.classList.remove('hidden'); // Show the copyright information

    // Loop through the retrieved data and create card elements
    allCard.forEach(card => {
        const timeS = card.others.posted_date;
        const time = secToHouAndMi(timeS); // Convert posted_date to hours and minutes

        // Create a new card div element
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `<div class="card w-[270px] h-[360px] bg-base-100 shadow-md">
                <div class="card-body"><img src="${card.thumbnail}" alt=""><span class="ml-20 mt-[-30px] text-[#fff] bg-[#000]">${time.hours} hrs ${time.minutes} min ago </span><div class="flex gap-4"><img src="${card.authors[0].profile_picture}" alt="" class="w-10 h-10 rounded-full"><h2 class="card-title">${card.title}</h2></div> <p class="ml-14">${card.authors[0].profile_name} <span id="span"></span></p><p class="ml-14">Views: ${card.others.views}</p></div></div>`;

        // Add a verified badge if the author is verified
        const span = document.getElementById('span');
        if (card.authors[0].verified == true) {
            span.innerHTML = `<img src="img/v.svg" alt="">`;
        }

        // Append the card to the card container
        cardContainer.appendChild(cardDiv);
    });
});

// Function to show the drawing section
function drawing() {
    const element = document.getElementById('drawing');
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ''; // Clear card container
    element.classList.remove('hidden'); // Show the drawing section
    const copy = document.getElementById('copy');
    copy.classList.add('hidden'); // Hide the copyright information
}

// Initial data load when the page loads
loadData();
