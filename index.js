var express = require("express");
var app = express();
const path = require("path");
const port = process.env.PORT || 3000;

var cors = require("cors");

app.use(
  cors({
    origin: "https://timestamp-4ecv.onrender.com",
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
  const dateParam = req.params.date;
  if (dateParam) {
    // Handle specific date
    res.json({
      unix: new Date(dateParam).getTime(),
      utc: new Date(dateParam).toUTCString(),
    });
  } else {
    // Handle current date
    res.json({
      unix: Date.now(),
      utc: new Date().toUTCString(),
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
