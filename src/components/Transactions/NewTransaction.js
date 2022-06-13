import React, { useRef } from "react";
import useStore from "../../hooks-store/useStore";
import Card from "../UI/Card";
import classes from "./NewTransactione.module.css";

//new expense = (Date, Category, Amount, Type of transaction)

const NewTransaction = () => {
  const dispatch = useStore(false)[1];

  const transactionTypeInputRef = useRef();
  const transactionAmountInputRef = useRef(0);
  const transactionCategoryInputRef = useRef();
  const transactionDateInputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const transactionType = transactionTypeInputRef.current.value;
    const transactionAmount = transactionAmountInputRef.current.value;
    const transactionCategory = transactionCategoryInputRef.current.value;
    const transactionDate = transactionDateInputRef.current.value;

    const transaction = {
      id: new Date().getTime(),
      type: transactionType,
      category: transactionCategory,
      date: transactionDate,
      amount: +transactionAmount,
    };
    dispatch('addTransaction', transaction);
  };

  return (
    <Card>
      <h3>New Transaction</h3>
      <form onSubmit={onSubmitHandler} className={classes.container}>
        <div className={classes.part1}>
          <select ref={transactionTypeInputRef}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <input placeholder="Category" ref={transactionCategoryInputRef}/>
        </div>

        <div className={classes.part2}>
          <input
            type="number"
            placeholder="Amount"
            ref={transactionAmountInputRef}
          />
          <input type="date" placeholder="Date" ref={transactionDateInputRef}/>
        </div>

        <button type="submit">Create</button>
      </form>
    </Card>
  );
};
export default NewTransaction;
