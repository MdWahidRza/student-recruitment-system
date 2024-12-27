// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// const cors = require("cors");
// const mongoose = require("mongoose");

// require("dotenv").config(); // Load environment variables

// const studentRoutes = require("./routes/studentRoutes"); // Importing student routes

// // DB connection string
// // @todo put it in env file
// const dbConnection = process.env.DB_CONNECTION;

// var app = express();

// // Enable CORS globally (IMPORTANT: always this BEFORE defining routes)
// app.use(cors());

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// // Define routes
// app.use("/students", studentRoutes); // Student routes

// // Catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // Error handler
// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // Render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// // Function to know what port the application is running on
// const PORT = 8080;
// app.listen(PORT, () => {
//   console.log(
//     `The server is running on port ${PORT}. Visit http://localhost:${PORT}/`
//   );
// });

// // Connecting mongoose database
// mongoose
//   .connect(dbConnection)
//   .then(() => console.log("Connected to MongoDB Atlas successfully!"))
//   .catch((error) => console.error("MongoDB connection error:", error));

// module.exports = app;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config(); // Load environment variables

const studentRoutes = require("./routes/studentRoutes"); // Student routes

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging
app.use(express.json()); // Parse JSON bodies

// Define Routes
app.use("/students", studentRoutes);

// Removed modules (commented out)
// const createError = require("http-errors"); // Previously used for creating HTTP errors
// const path = require("path"); // Previously used for path management (views or static files)
// const cookieParser = require("cookie-parser"); // Previously used for parsing cookies
// app.use(express.urlencoded({ extended: false })); // Previously used for parsing URL-encoded bodies
// app.use(express.static(path.join(__dirname, "public"))); // Previously used to serve static files
// app.set("views", path.join(__dirname, "views")); // Previously used for setting views directory
// app.set("view engine", "jade"); // Previously used to set view engine as Jade

// Error Handling
app.use((req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Resource not found",
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: "failed",
    message: err.message,
  });
});

// Database Connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas successfully!"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The server is running on port ${PORT}. Visit http://localhost:${PORT}/`
  );
});

module.exports = app;
