const express = require('express');
const { httpAddNewExpense, httpGetAllExpenses, httpGetUserExpense , httpDeleteExpense, httpUpdateExpense} = require('./expense.controller');

const expenseRouter = express.Router();



expenseRouter.get('/', httpGetAllExpenses)



expenseRouter.post('/add', httpAddNewExpense)
expenseRouter.post('/update', httpUpdateExpense)
expenseRouter.delete('/:id', httpDeleteExpense)



module.exports = expenseRouter