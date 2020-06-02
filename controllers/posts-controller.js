const HttpError = require("../models/http-error");
const RetriveTikTokPosts = require("../database/retrive-tiktok-posts");
const RetrieveInstaPosts = require("../database/retrive-insta-posts");

const getTikTokPosts = async (req, res, next) => {
  const { userName, tagName, fromDate, toDate } = req.body;
  console.log(
    "userName=>",
    userName,
    " tagName=>",
    tagName,
    " fromDate=>",
    fromDate,
    " toDate=>",
    toDate
  );

  let posts = [];
  try {
    posts = await RetriveTikTokPosts.RetrieveTikTokPosts(
      userName,
      tagName,
      fromDate,
      toDate
    );
    console.log("posts=>", posts);
  } catch (err) {
    const error = new HttpError(
      "Failed to retrieve data, Please report this issue.",
      500
    );
    return next(error);
  }
  //Send response
  res.status(201).json({ postCollector: posts });
};

const getInstagramPosts = async (req, res, next) => {
  const { userName, tagName, fromDate, toDate } = req.body;
  console.log(
    "userName=>",
    userName,
    " tagName=>",
    tagName,
    " fromDate=>",
    fromDate,
    " toDate=>",
    toDate
  );

  let posts = [];
  try {
    posts = await RetrieveInstaPosts.RetrieveInstaPosts(
      userName,
      tagName,
      fromDate,
      toDate
    );
    console.log("posts=>", posts);
  } catch (err) {
    const error = new HttpError(
      "Failed to retrieve data, Please report this issue.",
      500
    );
    return next(error);
  }
  //Send response
  res.status(201).json({ postCollector: posts });
};

exports.getTikTokPosts = getTikTokPosts;
exports.getInstagramPosts = getInstagramPosts;
