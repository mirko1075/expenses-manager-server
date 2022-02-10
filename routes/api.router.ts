const express = require("express");
import createError from "http-errors";
import { Request, Response } from 'express';
const apiRouter = express.Router();
import { Expenses, Categories } from "../models/expenses.model";
import {CategoryType, ExpenseType} from "../types/types";


// GET '/expenses' Get all expenses
apiRouter.get("/expenses", (req: Request, res: Response, next: Function) => {
  console.log("Get expenses list");
  Expenses.find()
  .populate({
    path: 'category',
    select:
      'categoryDescription',
  })
  .then((expensesList: Array<ExpenseType>) => {
    res.status(200).json(expensesList);
  })
  .catch((err: any) => {
    next(createError(err));
  });
});


// GET '/expenses/:expenseId' Get all expenses
apiRouter.get("/expenses/:expenseId", (req: Request, res: Response, next: Function) => {
  console.log("Get expense detail");
  const expenseId = req.params.expenseId;
  Expenses.findById(expenseId)
    .populate({
      path: 'category',
      select:
        'categoryDescription',
    })
    .then((expenseFound: ExpenseType) => {
      res.status(200).json(expenseFound);
    })
    .catch((err: any) => {
      next(createError(err));
    });
});

// GET '/expenses/:expenseId' Get all expenses
apiRouter.delete("/expenses", (req: Request, res: Response, next: Function) => {
  console.log("Delete expense");
  const expenseId = req.body.id;
  Expenses.findByIdAndDelete(expenseId)
    .then((expenseFound: ExpenseType) => {
      res.status(200).json(expenseFound);
    })
    .catch((err: any) => {
      next(createError(err));
    });
});

// GET '/expenses/:expenseId' Get all expenses
apiRouter.put("/expenses/:expenseId", (req: Request, res: Response, next: Function) => {
    console.log("Put expense detail");
    const expenseId = req.params.expenseId;
    const {
      type,
      shortDescription,
      source,
      category,
      description,
      dateOperation,
      amount
    } = req.body;
    Expenses.findByIdAndUpdate(expenseId,{
      type,
      shortDescription,
      source,
      category,
      description,
      dateOperation,
      amount
    })
    .then((expenseFound: ExpenseType) => {
      res.status(200).json(expenseFound);
    })
    .catch((err: any) => {
      next(createError(err));
    });
});

// POST '/expenses' Create expense
apiRouter.post("/expenses", (req: Request, res: Response, next: Function) => {
  console.log("Add expense");
  const {
    type,
    shortDescription,
    source,
    category,
    description,
    dateOperation,
    amount
  } = req.body;
  Expenses.create({
    type,
    shortDescription,
    source,
    category,
    description,
    dateOperation,
    amount
  })
    .then((expensesList: ExpenseType) => {
      res.status(200).json(expensesList);
    })
    .catch((err: any) => {
      next(createError(err));
    });
});


// GET '/categories' Get all expenses
apiRouter.get("/categories", (req: Request, res: Response, next: Function) => {
  console.log("Get categories list");
  Categories.find()
  .then((categoriesList: Array<CategoryType>) => {
    res.status(200).json(categoriesList);
  })
  .catch((err: any) => {
    next(createError(err));
  });
});

// POST '/categories' Create expense
apiRouter.post("/categories", (req: Request, res: Response, next: Function) => {
  console.log("Add category");
  const { categoryDescription } = req.body;
  Categories.create({ categoryDescription })
    .then((category: CategoryType) => {
      res.status(200).json(category);
    })
    .catch((err: any) => {
      next(createError(err));
    });
});
export default apiRouter;


