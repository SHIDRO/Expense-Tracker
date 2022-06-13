import React, { useEffect, useState } from "react";
import useStore from "../../hooks-store/useStore";

import classes from "./Incomes.module.css";

const Incomes = () => {
  const globalState = useStore()[0];

  const incomes = globalState.transactions.filter((tr) => tr.type === "Income");

  return (
    <div className={classes.card}>
      <h3>Income</h3>
      <span>{globalState.totalIncome}$</span>
      <h6>Division:</h6>

      {incomes.map((income, index) => {
        return (
          <IncomeItem
          key={income.id}
            date={income.date}
            id={income.id}
            category={income.category}
            amount={income.amount}
          />
        );
      })}
    </div>
  );
};

const IncomeItem = (props) => {
  const dispatch = useStore()[1];

  const removeIncomeHandler = () => {
    dispatch("removeTransaction", props.id);
  };

  return (
    <section className={classes["income-item"]} key={props.id}>
      <h5>
        <b>{props.category}</b>
      </h5>
      <span>
        {props.amount}$ - {props.date}
      </span>
      <span>
        <i onClick={removeIncomeHandler} className="fa fa-trash"></i>
      </span>
    </section>
  );
};
export default Incomes;
