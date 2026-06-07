import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
} from "../controllers/expense.controller";
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createExpense);
router.get("/", authenticate, getExpenses);
router.get("/:id", authenticate, getExpenseById);
router.put("/:id", authenticate, updateExpense);
router.delete("/:id", authenticate, deleteExpense);

export default router;
