const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");

// ---------------- View Profile ----------------
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: "ERROR: " + err.message });
  }
});

// ---------------- Edit Profile (PATCH) ----------------
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const isValid = validateEditProfileData(req);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid Edit Request" });
    }

    const loggedInUser = req.user;

    // ✅ Update fields dynamically
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== "") {
        loggedInUser[key] = req.body[key];
      }
    });

    await loggedInUser.save();

    res.status(200).json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    console.error("PATCH Error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// ---------------- Edit Profile (PUT) ----------------
profileRouter.put("/profile/edit", userAuth, async (req, res) => {
  try {
    const isValid = validateEditProfileData(req);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid edit fields" });
    }

    if (req.body.age) {
      req.body.age = Number(req.body.age);
    }

    // ✅ Remove empty "about"
    if (req.body.about === "") {
      delete req.body.about;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("PUT Error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = profileRouter;
