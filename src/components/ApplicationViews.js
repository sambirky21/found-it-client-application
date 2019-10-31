import { Route, withRouter, Redirect } from "react-router-dom";
import React from "react";
import useSimpleAuth from "../hooks/ui/useSimpleAuth";
import Register from "./auth/Register";
import Login from "./auth/Login";
import CreateItem from "./item/CreateItem";
import Categories from "./categories/Categories";
import ItemDetails from "./item/ItemDetails"
import ItemList from "./item/ItemList"


const ApplicationViews = () => {
  const { isAuthenticated } = useSimpleAuth();

  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={props => {
          if (isAuthenticated()) return <CreateItem {...props} />;
          else return <Redirect to="/login" />


        }}
      />
      <Route
        exact
        path="/categories"
        render={props => {
          if (isAuthenticated()) return <Categories {...props} />;
          else return <Redirect to="/login" />


        }}
      />
      <Route
        exact
        path="/item/:itemId(\d+)"
        render={props => {
          let itemId = +props.match.params.itemId;
          return <ItemDetails {...props} itemId={itemId} />;
        }}
      />
      <Route
        exact
        path="/items"
        render={props => {
          return <ItemList {...props} />;
        }}
      />
      <Route
        path="/register"
        render={props => {
          return <Register {...props} />;
        }}
      />

      <Route
        path="/login"
        render={props => {
          return <Login {...props} />;
        }}
      />
    </React.Fragment>
  );
};

export default withRouter(ApplicationViews);
