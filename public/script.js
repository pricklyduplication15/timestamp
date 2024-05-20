document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get("date") || ""; // Default to empty if no date provided

  // Construct the API URL based on the date parameter
  const apiUrl = `/api/${dateParam}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Update the HTML content with the received data
      document.getElementById("current-date").innerHTML =
        "Unix Timestamp: " + data.unix + "<br>UTC: " + data.utc;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
