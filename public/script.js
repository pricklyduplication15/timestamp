const baseURL = "https://timestamp-api-zetg.onrender.com/api";

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

function updateURLParameter(param, value) {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.pushState({}, "", url);
}

function updateDateParam(newDate) {
  const dateParam = isNaN(newDate)
    ? newDate
    : new Date(parseInt(newDate)).toISOString();
  updateURLParameter("date", dateParam);

  const apiUrl = `${baseURL}/${dateParam}`;
  fetchData(apiUrl)
    .then((data) => {
      document.getElementById("current-date").innerHTML =
        "Unix Timestamp: " + data.unix + "<br>UTC: " + data.utc;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      displayErrorMessage(
        "An error occurred while fetching data. Please try again later."
      );
    });
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

document.getElementById("update-button").addEventListener("click", () => {
  const dateInput = document.getElementById("date-input").value;
  updateDateParam(dateInput);
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
