import React, { useEffect, useState, useRef } from "react"
import MyItemCard from "../item/MyItemCard"
// import "../home/productlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const ItemList = props => {
    const [items, setItems] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    const search_items = useRef()


    //Author: Sam Birky
    //Purpose: Fetches items of user logged in
    //Methods: Maps over items objects and displays it to the DOM as a link that sends user to the product details page.

    const getItems = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/items`, {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("foundit_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                setItems(response))

        }
    }

    const fetchItemName = () => {
        if (isAuthenticated()) {
            let search_name = search_items.current.value

            fetch(`http://localhost:8000/items?name=${search_name}`, {

                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("foundit_token")}`
                }
            })
                .then(response => response.json())
                .then((response) =>
                setItems(response))
        }
    }
    useEffect(getItems, [])

    return (
        <>

        <label htmlFor="search_items">Search for Items by Name</label><br></br>
        <input type="search" id="search_input"  ref={search_items} placeholder="Name"/>

        <button id="search_input" onClick={() =>{fetchItemName()}}>Search</button>
        <button id="reset" onClick = {() => {getItems()}}>Reset</button>


        {items.length > 0 ?
                <article className="itemList">
                {
                        items.map(item =>{
                                return( <MyItemCard key={item.id} item={item} {...props} getItems={getItems} /> )
                        })
                }
                </article>
        : ""}
        </>
    )
}

export default ItemList