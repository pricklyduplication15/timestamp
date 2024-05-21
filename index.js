var express = require("express");
var app = express();
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

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // If no date parameter provided, return the current time
  if (!date) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Check if the provided date string is a valid date
  const dateObject = new Date(date);
  if (isNaN(dateObject.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  // Handle valid date string
  const unixTimestamp = dateObject.getTime(); // in milliseconds
  res.json({ unix: unixTimestamp, utc: dateObject.toUTCString() });
});

// Endpoint to handle both UTC and Unix timestamps
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // If no date parameter provided, return the current time
  if (!date) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Check if the provided date string is a valid date
  const dateObject = new Date(date);
  if (isNaN(dateObject.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  // Handle valid date string
  const utcDate = dateObject.toUTCString();
  res.json({ unix: dateObject.getTime(), utc: utcDate });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
