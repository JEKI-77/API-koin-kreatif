import { Op } from "sequelize";
import { Transaction } from "../models/Transaction_model.js";

// Create and Save a new Transaction
export const create = (req, res) => {
  // Validate request
  if (
    !req.body.amount ||
    !req.body.category ||
    !req.body.status ||
    !req.body.date
  ) {
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
  let whereClause = {}; // Inisialisasi objek untuk kriteria pencarian
  let limit = 10; // Jumlah item per halaman default
  let offset = 0; // Nilai offset default

  // Mendapatkan nilai query string startDate, endDate, category, page, dan perPage jika ada
  const { startDate, endDate, category, status, page, perPage } = req.query;

  // Menentukan offset berdasarkan nomor halaman dan jumlah item per halaman
  if (page && perPage) {
    limit = parseInt(perPage);
    offset = (parseInt(page) - 1) * limit;
  }

  // Cek apakah startDate dan endDate diberikan
  if (startDate && endDate) {
    // Jika kedua tanggal diberikan, gunakan keduanya untuk filter
    whereClause.date = {
      [Op.gte]: new Date(startDate),
      [Op.lte]: new Date(endDate),
    };
  } else if (startDate) {
    // Jika hanya startDate yang diberikan, gunakan untuk filter tanggal yang lebih besar atau sama
    whereClause.date = { [Op.gte]: new Date(startDate) };
  } else if (endDate) {
    // Jika hanya endDate yang diberikan, gunakan untuk filter tanggal yang lebih kecil atau sama
    whereClause.date = { [Op.lte]: new Date(endDate) };
  }

  // Cek apakah category diberikan
  if (category) {
    // Jika category diberikan, tambahkan kondisi untuk filter berdasarkan category
    whereClause.category = category;
  }
  if (status) {
    // Jika category diberikan, tambahkan kondisi untuk filter berdasarkan category
    whereClause.status = status;
  }

  // Mencari data dengan kriteria pencarian yang telah dibuat, dengan pagination
  Transaction.findAndCountAll({
    where: whereClause,
    limit: limit,
    offset: offset,
  })
    .then((result) => {
      const transactions = result.rows;
      const count = result.count;
      const totalPages = Math.ceil(count / limit);
      const currentPage = page ? parseInt(page) : 1;

      res.send({
        transactions: transactions,
        totalPages: totalPages,
        currentPage: currentPage,
      });
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
