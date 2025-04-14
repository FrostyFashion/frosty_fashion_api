import { loginUserValidator, registerUserValidator } from "../validators/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

export const registerUser = async (req, res, next) => {
  try {
    const { error, value } = registerUserValidator.validate(req.body);

    if (error) {
      return res.status(422).json(error);
    }

    // Check if user does not exist already
    const user = await UserModel.findOne({
      $or: [{ username: value.userName }, { email: value.email }],
    });

    if (user) {
      return res
        .status(409)
        .json("Email already in use. Please log in or use a different email.");
    }
    // Hash plaintext password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    // Create user record in database
    const newUser = await UserModel.create({
      ...value,
      password: hashedPassword,
    });

    res.status(201).json("Registration successful! Welcome aboard.");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    // Validate user information
    const { error, value } = loginUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // Find matching user record in database
    const user = await UserModel.findOne({
    //   $or: [{ username: value.userName }, { email: value.email }],
      email: value.email
    });

    if (!user) {
      return res
        .status(404)
        .json("User not found. Please sign up to create an account.");
    }
    // Compare incoming password with saved password
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
      return res
        .status(401)
        .json("Invalid email or password. Please try again.");
    }
    // Generate access token for user
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });

    res.status(200).json({
        accessToken,
        user : {
            email: user.email,
            role: user.role
        }
    })
  } catch (error) {
    next(error);
  }
};