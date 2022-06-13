import React from "react";
import useStore from "../../hooks-store/useStore";

import classes from "./Expenses.module.css";

const Expenses = () => {
  const globalState = useStore()[0];

  const expenses = globalState.transactions.filter(
    (tr) => tr.type === "Expense"
  );

  const expenseDivision = globalState.expenseCategories.map((category) => {
    return {
      name: category.category,
      precentage: (category.totalAmount * 100) / globalState.totalExpense,
    };
  });

  return (
    <div className={classes.card}>
      <h3>Expense</h3>
      <span>{globalState.totalExpense}$</span>
      <h6>Division:</h6>
      {expenseDivision.map((category) => {
        return (
          <div key={category.name}>
            <span>{category.name}: </span>
            <span>{category.precentage.toFixed(2)}%</span>
          </div>
        );
      })}

      {expenses.map((expense, index) => {
        return (
          <ExpenseItem
            key={expense.id}
            amount={expense.amount}
            date={expense.date}
            category={expense.category}
            id={expense.id}
          />
        );
      })}
    </div>
  );
};

const ExpenseItem = (props) => {
  const dispatch = useStore()[1];

  const removeExpenseHandler = () => {
    dispatch("removeTransaction", props.id);
  };

  return (
    <section className={classes["expense-item"]}>
      <h5>
        <b>{props.category}</b>
      </h5>
      <span>
        {props.amount}$ - {props.date}
      </span>
      <span>
        <i onClick={removeExpenseHandler} className="fa fa-trash"></i>
      </span>
    </section>
  );
};

export default Expenses;
