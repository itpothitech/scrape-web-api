const TikTokProfile = require("../models/tiktok-profile");
const UserProfile = require("../models/user-profiles");
const CONST = require("../database/CONST");

const stringToDate = (dateString) => {
  let parts = dateString.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
};
const RetrieveTikTokPosts = async (userName, tag, fromDate, toDate) => {
  try {
    let userProfile = [];
    let fromDateNew = new Date();
    let toDateNew = new Date();
    fromDateNew = stringToDate(fromDate);
    toDateNew = stringToDate(toDate);

    //Search with User name provided
    if (userName != "") {
      let queryStr = { "profile.user_name": userName };

      userProfile = await TikTokProfile.find(queryStr);
      console.log("user profile =>", userProfile);
    }
    return userProfile;
  } catch (error) {
    console.log(error);
    return CONST.NORESULT;
  }
};

exports.RetrieveTikTokPosts = RetrieveTikTokPosts;
