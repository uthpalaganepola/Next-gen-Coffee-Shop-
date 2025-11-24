import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// --------------------------
//  REGISTER USER
// --------------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, companyId, createdByRole } = req.body;

    // ROLE PERMISSION RULES:
    // Super Admin -> can create Admin
    // Admin -> can create Staff OR Customer
    // Staff cannot create anyone

    if (createdByRole === "staff") {
      return res
        .status(403)
        .json({ message: "Staff members cannot create new users." });
    }

    if (createdByRole === "admin" && role === "admin") {
      return res
        .status(403)
        .json({ message: "Admins cannot create other admins." });
    }

    if (createdByRole === "super_admin" && role === "super_admin") {
      return res
        .status(403)
        .json({ message: "Super admin cannot create additional super admins." });
    }

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      companyId: role !== "super_admin" ? companyId : null,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// --------------------------
// LOGIN USER
// --------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id, user.role);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
