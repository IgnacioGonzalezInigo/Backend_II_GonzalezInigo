import { Router } from "express";
import mongoose from "mongoose";
import { User } from "../../models/user.model.js";
import { passportCall } from "../../utils/passportCall.js";

const router = Router();

// get todo
router.get("/", passportCall("jwt"), async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    return res.json({ status: "success", payload: users });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

// get por id
router.get("/:uid", passportCall("jwt"), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.uid)) {
      return res.status(400).json({ status: "error", msg: "Invalid user id" });
    }

    const user = await User.findById(req.params.uid).select("-password").lean();
    if (!user) return res.status(404).json({ status: "error", msg: "User not found" });

    return res.json({ status: "success", payload: user });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

// update
router.put("/:uid", passportCall("jwt"), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.uid)) {
      return res.status(400).json({ status: "error", msg: "Invalid user id" });
    }

    const updated = await User.findByIdAndUpdate(req.params.uid, req.body, { new: true })
      .select("-password")
      .lean();

    if (!updated) return res.status(404).json({ status: "error", msg: "User not found" });
    return res.json({ status: "success", payload: updated });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

// delete
router.delete("/:uid", passportCall("jwt"), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.uid)) {
      return res.status(400).json({ status: "error", msg: "Invalid user id" });
    }

    const deleted = await User.findByIdAndDelete(req.params.uid).lean();
    if (!deleted) return res.status(404).json({ status: "error", msg: "User not found" });

    return res.json({ status: "success", payload: { id: deleted._id } });
  } catch (error) {
    return res.status(500).json({ status: "error", msg: error.message });
  }
});

export default router;
