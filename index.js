const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

var cors = require("cors");

app.use(
  cors({
    optionsSuccessStatus: 200,
  })
);

// Serve static files from the "public" directory with correct MIME types
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date?", (req, res) => {
  let date = new Date(req.params.date);

  if (isInvalidDate(date)) {
    date = new Date(+req.params.date);
  }
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
