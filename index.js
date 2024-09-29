// URL_Shortener API

const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const connectDB = require("./db/connect");
const router = require("./routes/url");
const User = require("./models/User");

// Connect to MongoDB
connectDB();

// Middleware

app.use(express.json());
app.use("/url", router);




// Listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
