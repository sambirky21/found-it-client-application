import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {

      fetch("http://localhost:8000/categories", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("foundit_token")}`
        }
      })
        .then(response => response.json())
        .then(setCategories);

  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2>Categories</h2>
      <div>
          {/* filters categories for ones with at least one item so
         that categories with no items will display.  */}
        {categories
          .filter(
            category =>
              category.item_set.map(cat => {
                return <div key={cat.id}>{cat.name}</div>;
              }).length >= 1
          )
          .map(item => {
            let catId = +item.url.split("s/")[1];
            return (
              <div key={catId}>
            {/* renders item category name */}
                <h3>
                <Link to={`/category/${catId}`}>{item.name}</Link> (
                  {
                    item.item_set.map(item => {
                      return <ul>{item.name}</ul>
                      ;
                    }).length
                  }
                  )
                </h3>
                {/* renders prouct name by category and uses slice to select indices 0,1,2 in the array */}
                <ul>
                  {item.item_set.slice(0, 3).map(item => {
                    let itemId = +item.url.split("s/")[1];
                    return (
                      <div key={itemId}>
                        <Link to={`/item/${itemId}`}>{item.name}</Link>
                      </div>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Categories;
