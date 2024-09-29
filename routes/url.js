const express = require("express");

const Router = express.Router();
const {
  createShortURL,
  redirectURL,
  getShortURL,
  updateShortURL,
  deleteShortURL,
} = require("../controllers/url");

Router.route("/").post(createShortURL);
Router.route("/:shortID").get(redirectURL);



module.exports = Router;
