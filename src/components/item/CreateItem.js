import React, { useState, useEffect, useRef } from "react"

// Author: Sam Birky
// Purpose: Display add new item form to add new item to database
// Methods: GET, POST

const CreateItem = props => {
    const category_value = useRef()
    const name = useRef()
    const description = useRef()
    const quantity = useRef()
    const location = useRef()
    const [categoryList, setCategoryList] = useState([])


    useEffect(() => {
        // Fetch the data from localhost:8000/categories
        fetch("http://localhost:8000/categories", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("foundit_token")}`
            }
        })
        // Convert to JSON
        .then(response => response.json())
        // Store category names in state variable
        .then(setCategoryList)
    }, [])


    const addNewItem = (event) => {
        let validCharacters = /[!@#$%^&*()]+/
        event.preventDefault()
        if (category_value.current.value === "") {
            alert("Please select a Category")
        }
        else if ((name.current.value).match(validCharacters) || (description.current.value).match(validCharacters)) {
            window.alert("Please enter item name/details with no special characters; ie. no '!@#$%^&*()'")
        }
        else {
        let today = new Date();
        let dd = today.getDate()
        let mm = today.getMonth()+1
        let yyyy = today.getFullYear()
        fetch("http://localhost:8000/items", {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("foundit_token")}`
            },
            "body": JSON.stringify({
                "name": name.current.value,
                "description": description.current.value,
                "quantity": quantity.current.value,
                "location": location.current.value,
                "created_at": `${yyyy}-${mm}-${dd}`,
                "category": category_value.current.value,

            })
        })
            .then(response => response.json())
            .then(() => {
                alert("Your Item Has Been Added")
                props.history.push("/categories")
            })

    }
    }

    return (
        <>
        {/* Form for adding a new Item to sell */}
                <div>
                    <form>
                        <h2>Add An Item to Find It Later!</h2>
                        <fieldset className="form-group">
                            <label htmlFor="itemName">Item Name</label>
                            <input
                            ref={name}
                            type="text"
                            required
                            className="form-control"

                            id="itemName"
                            placeholder="Item Name"
                            />
                            </fieldset>
                            <fieldset className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                            ref={description}
                            type="textarea"
                            required
                            className="form-control"

                            id="description"
                            placeholder="Describe Your Item"
                            />
                            </fieldset>
                            <fieldset className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                            ref={quantity}
                            type="number"
                            name= "quantity"
                            required
                            className="form-control"
                            id="quantity"
                            placeholder="Quantity"
                            />
                            </fieldset>
                            <fieldset className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                            ref={location}
                            type="text"
                            name= "location"
                            required
                            className="form-control"
                            id="location"
                            placeholder="Location"
                            />
                            </fieldset>
                                <fieldset>
                                    <label htmlFor="category">Category:  </label>

                                    <select ref={category_value} id = "category-name" name="category" required placeholder="Category">
                                        {/* Set default option for category dropdown */}
                                        <option value="">Please select a category</option>
                            {
                                // Map over the state of category types i.e. categories and set the id and name for each option in the category dropdown
                                        categoryList.map((category) => {
                                            return (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            )

                                        })
                                    }
                                    </select>
                                </fieldset>
                            <button
                            type="submit"
                            onClick={addNewItem}
                            className="btn btn-primary"
                            >
                            Add Item
                            </button>
                    </form>
                    </div>
            </>
    )
}
export default (CreateItem)