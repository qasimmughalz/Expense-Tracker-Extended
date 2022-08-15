const express = require('express');
const { httpAddNewExpense, httpGetAllExpenses, httpGetUserExpense } = require('./expense.controller');

const expenseRouter = express.Router();



expenseRouter.get('/', httpGetAllExpenses)



expenseRouter.post('/add', httpAddNewExpense)




module.exports = expenseRouter