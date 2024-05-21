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

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // Check if date parameter is provided
  if (date) {
    // Check if date is in UTC format
    if (!isNaN(Date.parse(date))) {
      const utcDate = new Date(date).toUTCString();
      res.json({ unix: Date.parse(utcDate), utc: utcDate });
    } else {
      // Check if date is in Unix format
      const unixDate = new Date(parseInt(date));
      if (!isNaN(unixDate.getTime())) {
        res.json({ unix: parseInt(date), utc: unixDate.toUTCString() });
      } else {
        res.status(400).json({ error: "Invalid date format" });
      }
    }
  } else {
    // If no date parameter provided, return current UTC time
    const utcNow = new Date().toUTCString();
    res.json({ unix: Date.now(), utc: utcNow });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
