async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    displayErrorMessage(
      "An error occurred while fetching data. Please try again later."
    );
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
  const apiUrl = dateParam ? `/api/${dateParam}` : "/api/";

  try {
    const data = await fetchData(apiUrl);
    if (data) {
      document.getElementById("current-date").innerHTML =
        "Unix Timestamp: " + data.unix + "<br>UTC: " + data.utc;
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Initial fetch to populate the page with data from the default URL
fetchData("https://localhost:3000/api/").then((data) => {
  console.log("Data fetched successfully:", data);
});
