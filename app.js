const express = require("express");
const bodyParser = require("body-parser");
const timeout = require("connect-timeout");

const mongoose = require("mongoose");

const postRoutes = require("./routes/posts-routes");
const HttpError = require("./models/http-error");

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next();
};

const app = express();
app.use(timeout("600s"));
app.use(bodyParser.json());
app.use(haltOnTimedout);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api", postRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Count not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

mongoose
  .connect(
    // `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-free-2u1w7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    `mongodb+srv://scraper:eGRsfe2ZFZnZapuo@cluster-free-2u1w7.mongodb.net/dev_local?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
