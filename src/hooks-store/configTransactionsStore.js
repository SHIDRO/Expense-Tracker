import React from "react";
import { initStore } from "./useStore";

const configTransactionsStore = () => {
  const initialActions = {
    addTransaction(state, payload) {
      const updatedTransactions = state.transactions;
      let updatedExpenseCategories = state.expenseCategories;
      let updatedIncomeCategories = state.incomeCategories;

      updatedTransactions.push(payload);
      let newTotalIncome = state.totalIncome;
      let newTotalExpense = state.totalExpense;
      let newTotalBalance = state.totalBalance;

      if (payload.type === "Income") {
        newTotalIncome += payload.amount;
        newTotalBalance = newTotalIncome - state.totalExpense;

        const findCategoryIncomeIndex = updatedIncomeCategories.findIndex(
          (incomeCategory) => incomeCategory.category === payload.category
        );

        if (findCategoryIncomeIndex === -1) {
          updatedIncomeCategories.push({
            category: payload.category,
            totalAmount: payload.amount,
            counter: 1,
          });
        } else {
          updatedIncomeCategories[findCategoryIncomeIndex].totalAmount +=
            payload.amount;
          updatedIncomeCategories[findCategoryIncomeIndex].counter++;
        }
      } else {
        newTotalExpense += payload.amount;
        newTotalBalance = state.totalIncome - newTotalExpense;

        const findCategoryExpenseIndex = updatedExpenseCategories.findIndex(
          (expenseCategory) => expenseCategory.category === payload.category
        );

        if (findCategoryExpenseIndex === -1) {
          updatedExpenseCategories.push({
            category: payload.category,
            totalAmount: payload.amount,
            counter: 1,
          });
        } else {
          updatedExpenseCategories[findCategoryExpenseIndex].totalAmount +=
            payload.amount;
          updatedExpenseCategories[findCategoryExpenseIndex].counter++;
        }
      }

      return {
        transactions: [...updatedTransactions],
        totalIncome: newTotalIncome,
        totalExpense: newTotalExpense,
        totalBalance: newTotalBalance,
        expenseCategories: updatedExpenseCategories,
        incomeCategories: updatedIncomeCategories,
      };
    },
    removeTransaction(state, payload) {
      let updatedTransactions = state.transactions;
      const transaction = updatedTransactions.find((tr) => tr.id === payload);

      let newTotalIncome = state.totalIncome;
      let newTotalExpense = state.totalExpense;

      let updatedExpenseCategories = state.expenseCategories;
      let updatedIncomeCategories = state.incomeCategories;

      if (transaction.type === "Income") {
        newTotalIncome -= transaction.amount;

        const foundIncomeCategoryIndex = updatedIncomeCategories.findIndex(
          (category) => category.category === transaction.category
        );

        if (updatedIncomeCategories[foundIncomeCategoryIndex].counter === 1) {
          updatedIncomeCategories = updatedIncomeCategories.filter(
            (category) =>
              category.category !==
              updatedIncomeCategories[foundIncomeCategoryIndex].category
          );
        } else {
          updatedExpenseCategories[foundIncomeCategoryIndex].totalAmount -=
            transaction.amount;
          updatedExpenseCategories[foundIncomeCategoryIndex].counter--;
        }
      } else {
        newTotalExpense -= transaction.amount;

        const foundExpenseCategoryIndex = updatedExpenseCategories.findIndex(
          (category) => category.category === transaction.category
        );

        if (updatedExpenseCategories[foundExpenseCategoryIndex].counter === 1) {
          updatedExpenseCategories = updatedExpenseCategories.filter(
            (category) =>
              category.category !==
              updatedExpenseCategories[foundExpenseCategoryIndex].category
          );
        } else {
          updatedExpenseCategories[foundExpenseCategoryIndex].totalAmount -= transaction.amount;
          updatedExpenseCategories[foundExpenseCategoryIndex].counter--;
        }
      }
      updatedTransactions = updatedTransactions.filter(
        (tr) => tr.id !== payload
      );
      return {
        transactions: updatedTransactions,
        totalIncome: newTotalIncome,
        totalExpense: newTotalExpense,
        totalBalance: newTotalIncome - newTotalExpense,
        expenseCategories: updatedExpenseCategories,
        incomeCategories: updatedIncomeCategories,
      };
    },
  };

  const initialState = {
    transactions: [],
    incomeCategories: [],
    expenseCategories: [],
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
  };

  initStore(initialState, initialActions);
};

export default configTransactionsStore;
