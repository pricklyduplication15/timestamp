const isLocalhost = window.location.hostname === "localhost";
const baseURL = isLocalhost
  ? "http://localhost:3000/api"
  : "https://timestamp-4ecv.onrender.com/api";

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
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
  const dateParam = urlParams.get("date") || "";
  const apiUrl = dateParam ? `${baseURL}/${dateParam}` : `${baseURL}/`;

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

// Initial fetch to populate the page with data from the server
fetchData(baseURL)
  .then((data) => {
    console.log("Data fetched successfully:", data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    displayErrorMessage(
      "An error occurred while fetching data. Please try again later."
    );
  });
