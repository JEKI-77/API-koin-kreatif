import { Transaction } from "../models/Transaction_model.js";

// Create and Save a new Transaction
export const create = (req, res) => {
  // Validate request
  if (!req.body.amount || !req.body.category || !req.body.status || !req.body.date) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Transaction
  const newTransaction = {
    amount: req.body.amount,
    category: req.body.category,
    status: req.body.status,
    date: req.body.date,
    
  };

  // Save Transaction in the database
  Transaction.create(newTransaction)
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction.",
      });
    });
};

// Retrieve all Transactions from the databa  se.
export const findAll = (req, res) => {
  Transaction.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Transactions.",
      });
    });
};

// Find a single Transaction with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Transaction.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Transaction with id=" + id,
      });
    });
};

// Update a Transaction by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Transaction.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Transaction was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Transaction with id=" + id,
      });
    });
};

export const deleteTransaction = (req, res) => {
  const id = req.params.id;

  Transaction.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Transaction was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Transaction with id=" + id,
      });
    });
};
