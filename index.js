const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

var cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "https://timestamp-api-zetg.onrender.com/",
    method: "GET",
    optionsSuccessStatus: 200,
  })
);

// Serve static files from the "public" directory with correct MIME types
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// Serve the index.html file from the "views" folder as the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // Function to check if input is a valid Unix timestamp
  const isValidUnixTimestamp = (input) => {
    return /^\d+$/.test(input);
  };

  // Function to convert Unix timestamp to UTC string
  const convertUnixToUTC = (unixTimestamp) => {
    const dateObject = new Date(parseInt(unixTimestamp));
    return dateObject.toUTCString();
  };

  // Check if the provided date is a valid Unix timestamp
  if (isValidUnixTimestamp(date)) {
    const unixTimestamp = parseInt(date); // Convert to number
    return res.json({
      unix: unixTimestamp,
      utc: convertUnixToUTC(unixTimestamp),
    });
  }

  // Check if the provided date string is a valid date
  const dateObject = new Date(date);
  if (isNaN(dateObject.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  // Handle valid date string
  const unixTimestamp = dateObject.getTime(); // in milliseconds
  res.json({
    unix: unixTimestamp,
    utc: dateObject.toUTCString(),
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
