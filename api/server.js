// BUILD YOUR SERVER HERE
const express = require("express");
const Model = require("./users/model");

const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;
  try {
    if (!name || !bio) {
      res.status(422).json({ message: "Please include a name and bio" });
    } else {
      const newUser = await Model.insert({ name, bio });
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await Model.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Model.findById(id);
  try {
    if (!user) {
      res.status(404).json(`Could not find user with id ${id}`);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await Model.remove(id);
  try {
    if (!deletedUser) {
      res.status(404).json(`Could not find user with id ${id}`);
    } else {
      res.status(200).json(deletedUser);
    }
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    if (!name || !bio) {
      res.status(422).json("Please include a name and bio");
    } else {
      const updatedUser = await Model.update(id, { name, bio });
      if (!updatedUser) {
        res.status(404).json(`Could not find user with id ${id}`);
      } else {
        res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
