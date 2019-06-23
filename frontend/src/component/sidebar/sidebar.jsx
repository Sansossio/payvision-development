import React from "react";
import "./sidebar-style.scss";
import { NavLink } from "react-router-dom";

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__logo">Payvision</div>
        <div className="sidebar__button">
          <NavLink to="/">Listing</NavLink>
        </div>
        <div className="sidebar__button">
          <NavLink to="/resume">Resume</NavLink>
        </div>
      </div>
    );
  }
}
