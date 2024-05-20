const url = "http://localhost:3000/api";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json(); // Move inside the try block
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error so that it can be caught by the caller
  }
}

fetchData(url).then((data) => {
  console.log("Data fetched successfully:", data);
});

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
