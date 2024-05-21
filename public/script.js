async function fetchData(url) {
  try {
    const response = await fetch(url);

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      const errorMessage = await response.text(); // Read the response body as text
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error so that it can be caught by the caller
  }
}

function displayErrorMessage(message) {
  const errorElement = document.getElementById("error-message");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  } else {
    alert(message);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get("date") || ""; // Default to empty if no date provided
  const apiUrl = dateParam
    ? `http://localhost:3000/api/${dateParam}`
    : "http://localhost:3000/api/";

  try {
    const data = await fetchData(apiUrl);
    if (data) {
      document.getElementById("current-date").innerHTML =
        "Unix Timestamp: " + data.unix + "<br>UTC: " + data.utc;
    }
  } catch (error) {
    console.error("Error:", error);
    displayErrorMessage(
      "An error occurred while fetching data. Please try again later."
    );
  }
});

// Initial fetch to populate the page with data from the local server
fetchData("http://localhost:3000/api/")
  .then((data) => {
    console.log("Data fetched successfully:", data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    displayErrorMessage(
      "An error occurred while fetching data. Please try again later."
    );
  });
