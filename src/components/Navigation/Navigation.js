import React from 'react'
import {NavLink} from 'react-router-dom';
import classes from './Navigation.module.css'

export default function Navigation(){
  return (
    <header>
    <nav>
        <ul className={classes.links}>
            <li>
                <NavLink className={(navData) => navData.isActive ? `${classes["link-active"]}` : ""} to="/">Home</NavLink>
            </li>
            <li>
                <NavLink className={(navData) => navData.isActive ? `${classes["link-active"]}` : ""} to="/Dashboard">Dashboard</NavLink>
            </li>
            <li>
                <NavLink className={(navData) => navData.isActive ? `${classes["link-active"]}` : ""} to="/Profile">Profile</NavLink>
            </li>
        </ul>
    </nav>
    </header>
  )
}
