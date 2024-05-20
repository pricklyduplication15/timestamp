document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3001/api/date")
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
});
