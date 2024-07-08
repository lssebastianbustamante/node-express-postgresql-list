const pool = require("../database");

const getAllTasks = async (req, res, next) => {
  try {
    const { rows, rowCount } = await pool.query("SELECT * FROM task");
    if (rows.length === 0) return;
    if (rowCount > 0) {
      res.status(200).json({
        status: "success",
        result: rows.length,
        data: rows,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  const id = req.params.id * 1;
  try {
    const query = "SELECT * FROM task WHERE id = $1";
    const value = [id];
    const { rows, rowCount } = await pool.query(query, value);

    if (rowCount > 0) {
      res.status(200).json({
        status: "success",
        data: rows[0],
      });
    }
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;
    console.log(title, description)
  try {
    const query =
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *";
    const value = [title, description];
    const { rows } = await pool.query(query, value);
    if (Object.keys(req.body).length === 0) {
      return res.status(500).json({
        status: "fail",
        message: "Bad request",
      });
    }

    res.status(200).json({
      status: "success",
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  const id = req.params.id * 1;
  try {
    const query = "DELETE FROM task WHERE id = $1 RETURNING *";
    const value = [id];
    const { rows } = await pool.query(query, value);

    if (rows.length === 0) {
      return res.status(405).json({
        status: "fail",
        message: "Task no encontrada",
      });
    }
    res.status(204).json({
      status: "success",
      message: "Task elmininada",
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const query =
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *";
    const value = [title, description, id];

    const { rows } = await pool.query(query, value);
    
    if (Object.keys(req.body).length === 0) {
      return res.status(500).json({
        status: "fail",
        message: "Bad request",
      });
    }

    if (rows.length === 0) {
      return res.status(500).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTaskById,
  updateTaskById,
};
