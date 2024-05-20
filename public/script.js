document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get("date");

  // Construct the API URL based on the date parameter
  const apiUrl = `http://localhost:3000/api/${dateParam}`;

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
      console.log(data.unix);
      console.log(data.utc);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
