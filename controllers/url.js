const express = require("express");
const app = express();
const User = require("../models/User");

async function createShortURL(req, res) {
  try {
    const { nanoid } = await import("nanoid");
    const body = req.body;
    if (!body.redirectURL) {
      return res.status(400).json({ message: "URL is required" });
    }
    const { redirectURL } = body;
    const shortID = nanoid(8);
    const url = await User.create({
      shortID: shortID,
      redirectURL: redirectURL,
      visitHistory: [],
    });
    res.status(201).json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function redirectURL(req, res) {
  try {
    const { shortID } = req.params;
    //  console.log("shortID:", shortID); // Log the shortID to verify

    const entry = await User.findOneAndUpdate(
      { shortID },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );
    //  console.log("entry:", entry); // Log the entry found

    if (!entry) {
      return res.status(404).json({ message: "URL not found" });
    }
    res.redirect(entry.redirectURL);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getShortURL(req, res) {
  try {
    const { shortID } = req.params;
    const url = await User.findOne({ shortID });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateShortURL(req, res) {
  try {
    const { shortID } = req.params;
    const { redirectURL } = req.body;
    const url = await User.findOneAndUpdate(
      { short },
      { redirect },
      { new: true }
    );
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteShortURL(req, res) {
  try {
    const { shortID } = req.params;
    const url = await User.findOneAndDelete({ shortID });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createShortURL,
  redirectURL,
  getShortURL,
  updateShortURL,
  deleteShortURL,
};
