import React from 'react'
import { initStore } from './useStore'

const configTransactionsStore = () => {
    const initialActions = {
        addTransaction(state, payload){
            const updatedTransactions = state.transactions;
            let updatedExpenseCategories = state.expenseCategories;
            let updatedIncomeCategories = state.incomeCategories;


            updatedTransactions.push(payload);
            let newTotalIncome = state.totalIncome
            let newTotalExpense = state.totalExpense
            let newTotalBalance = state.totalBalance

            if(payload.type === 'Income'){
                    newTotalIncome  += payload.amount
                    newTotalBalance = newTotalIncome - state.totalExpense

                    if(updatedIncomeCategories[payload.category]){
                        updatedIncomeCategories[payload.category] += 1;
                    } else {
                        updatedIncomeCategories[payload.category] = 1;
                    }
            } else {
                    newTotalExpense += payload.amount
                    newTotalBalance = state.totalIncome - newTotalExpense

                    if(updatedExpenseCategories[payload.category]){
                        updatedExpenseCategories[payload.category]+=1
                    } else {
                        updatedExpenseCategories[payload.category]=1
                    }
            }

            return {
                transactions: [...updatedTransactions],
                totalIncome: newTotalIncome,
                totalExpense: newTotalExpense,
                totalBalance: newTotalBalance,
                expenseCategories: updatedExpenseCategories,
                incomeCategories: updatedIncomeCategories
            }
        },
        removeTransaction(state, payload){
            let updatedTransactions = state.transactions;
            const transaction = updatedTransactions.find(tr => tr.id === payload);

            let newTotalIncome = state.totalIncome;
            let newTotalExpense = state.totalExpense;

            let updatedExpenseCategories = state.expenseCategories;
            let updatedIncomeCategories = state.incomeCategories;
            if(transaction.type === "Income"){
                newTotalIncome -= transaction.amount;

                
                if(updatedIncomeCategories[transaction.category] === 1){
                    delete updatedIncomeCategories[transaction.category]
                  } else {
                    updatedIncomeCategories[transaction.category] -=1
                  }

            } else {
                newTotalExpense -= transaction.amount;  

                if(updatedExpenseCategories[transaction.category] === 1){
                    delete updatedExpenseCategories[transaction.category]
                  } else {
                   updatedExpenseCategories[transaction.category] -=1
                  }
            }
            updatedTransactions = updatedTransactions.filter(tr => tr.id !== payload);
            return {
                transactions: updatedTransactions,
                totalIncome: newTotalIncome,
                totalExpense: newTotalExpense,
                totalBalance: newTotalIncome - newTotalExpense,
                expenseCategories: updatedExpenseCategories,
                incomeCategories: updatedIncomeCategories
            }
        }
    }

    const initialState = {
        transactions: [],
        incomeCategories: [],
        expenseCategories: [],
        totalIncome: 0,
        totalExpense: 0,
        totalBalance: 0
    }

    initStore(initialState ,initialActions);
}

export default configTransactionsStore;