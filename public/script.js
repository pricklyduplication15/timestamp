document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get("date");

  const apiUrl = `https://localhost:3000/api/${dateParam}`;

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
      console.log(data.unix);
      console.log(data.utc);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log("JavaScript file loaded correctly.");
});
