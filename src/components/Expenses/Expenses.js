import React from "react";
import useStore from "../../hooks-store/useStore";

import classes from "./Expenses.module.css";

const Expenses = () => {
  const globalState = useStore()[0];

  const expenses = globalState.transactions.filter(
    (tr) => tr.type === "Expense"
  );

  return (
    <div className={classes.card}>
      <h3>Expense</h3>
      <span>{globalState.totalExpense}$</span>

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
    dispatch('removeTransaction', props.id);
  }

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
