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
              category.organizer_items.map(cat => {
                return <div key={cat.id}>{cat.name}</div>;
              }).length >= 1
          )
          .map(item => {
            let catId = +item.url.split("s/")[1];
            return (
              <div key={catId}>
            {/* renders item category name */}
                <h3>
                {item.name} (
                  {
                    item.organizer_items.map(item => {
                      return <ul>{item.name}</ul>
                      ;
                    }).length
                  }
                  )
                </h3>
                {/* renders item name by category and uses slice to select indices 0,1,2 in the array */}
                <ul>
                  {item.organizer_items.map(item => {
                    // let itemId = +item.url.split("s/")[1];
                    return (
                      <div key={item.id}>
                        <Link to={`/item/${item.id}`}>{item.name}</Link>
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
// slice(0, 3).