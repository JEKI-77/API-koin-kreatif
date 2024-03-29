import { Category } from "../models/Category_model.js";

// Create and Save a new Category
export const create = (req, res) => {
  // Validate request
  if (!req.body.category || !req.body.status) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Category
  const newCategory = {
    category: req.body.category,
    status: req.body.status,
  };

  // Save Category in the database
  Category.create(newCategory)
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    });
};

// Retrieve all Categorys from the database.
export const findAll = (req, res) => {
  Category.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categorys.",
      });
    });
};

// Find a single Category with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id,
      });
    });
};

// Update a Category by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Category with id=" + id,
      });
    });
};

export const deleteCategory = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id,
      });
    });
};
