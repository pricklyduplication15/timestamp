document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get("date") || ""; // Default to empty if no date provided

  const apiUrl = dateParam ? `/api/${dateParam}` : "/api/";

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("current-date").innerHTML =
        "Unix Timestamp: " + data.unix + "<br>UTC: " + data.utc;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
