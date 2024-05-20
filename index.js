var express = require("express");
var app = express();
const path = require("path");
const port = 3001;

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  console.log("Received request:", req.params.date);

  let dateInput = req.params.date;

  if (!dateInput) {
    console.log("No date input provided");
    return res.json({ unix: Date.now() });
  }

  if (!isNaN(dateInput)) {
    dateInput = parseInt(dateInput, 10);
  }

  const parsedDate = new Date(dateInput);

  if (isNaN(parsedDate.getTime())) {
    console.log("Invalid date input");
    return res.status(400).json({ error: "Invalid date" });
  }

  console.log("Valid date input:", parsedDate);

  const utcFormattedDate = parsedDate.toUTCString();
  res.json({ unix: parsedDate.getTime(), utc: utcFormattedDate });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
