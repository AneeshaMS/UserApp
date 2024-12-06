var express = require("express");
const adminModel = require("../Model/admin.model");
const userModel = require("../Model/user.model");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("User App is running....");
});

router.post("/register", (req, res) => {
  // To post / insert data into database
  console.log(req.body);
  const { email, password } = req.body;
  adminModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      adminModel
        .create(req.body)
        .then((log_reg_form) =>
          res.json({
            data: log_reg_form,
            message: "User registered successfully!",
          })
        )
        .catch((err) => res.json(err));
    }
  });
});

router.post("/login", (req, res) => {
  // To find record from the database
  const { email, password } = req.body;
  adminModel.findOne({ email: email }).then((user) => {
    if (user) {
      // If user found then these 2 cases
      if (user.password === password) {
        res.json({ message: "Success" });
      } else {
        res.json({ message: "Wrong password" });
      }
    }
    // If user not found then
    else {
      res.json({ message: "No records found! " });
    }
  });
});

router.post("/users/add", async (req, res) => {
  try {
    const { firstName, lastName, place } = req.body;

    const newUser = new userModel({ firstName, lastName, place });
    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, place } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { firstName, lastName, place },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;
