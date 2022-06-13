import React from 'react';

import NewTransaction from "../components/Transactions/NewTransaction";
import Incomes from "../components/Incomes/Incomes";
import Expenses from '../components/Expenses/Expenses';

import classes from './Home.module.css'
import useStore from '../hooks-store/useStore';

const Home = () => {
  const globalState = useStore()[0];

  return (
    <div>
        <NewTransaction/>
        <h2> Total Balance: {globalState.totalBalance}$</h2>
        <div className={classes.dashboard}>
          <Incomes/>
          <Expenses/>
        </div>
      
    </div>
  )
}
export default Home;