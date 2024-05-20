var express = require("express");
var app = express();
const path = require("path");
const port = process.env.PORT || 3000;

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

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
  console.log("Received request:", req.params.date);

  let dateInput = req.params.date;

  if (!dateInput) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  if (!isNaN(dateInput)) {
    dateInput = parseInt(dateInput, 10);
    if (dateInput.toString().length === 10) {
      dateInput *= 1000;
    }
  }

  const parsedDate = new Date(dateInput);

  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "Invalid date" });
  }

  res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
