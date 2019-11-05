import React from "react";
import { Link } from "react-router-dom";
// import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const NavBar = props => {
  const { isAuthenticated, logout } = useSimpleAuth();

  return (
    <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow navbar-fixed-top">
      <ul className="nav nav-pills nav-fill">

        {isAuthenticated() ? (
          <>
            <li className="nav-item">
              <Link className="nav-link text-warning" to="/">
                Create an Item
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-warning" to="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-warning" to="/items">
                My Items
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn-warning text-white fakeLink"
                onClick={() => {
                  logout();
                  props.history.push({
                    pathname: "/"
                  });
                }}
              >
                Logout
            </button>
            </li>
          </>) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-warning" to="/login">
                  Login
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning" to="/register">
                  Register
              </Link>
              </li>
            </>
          )}
      </ul>
    </nav>
  );
};

export default NavBar;
