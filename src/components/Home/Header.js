import React from "react";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Cyberlearn
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="dropdownId"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Bài tập
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="dropdownId">          
              <NavLink className="dropdown-item" to="/todolistrfc">
                ToDoListRFC
              </NavLink>
              <NavLink className="dropdown-item" to="/todolistrcc">
                ToDoListRCC
              </NavLink>              
            </div>
          </li>
        </ul>
        <form className="form-inline navbar-nav my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button
            className="btn btn-outline-warning my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Đăng nhập
            </NavLink>
          </li>
        </form>
      </div>
    </nav>
  );
}
