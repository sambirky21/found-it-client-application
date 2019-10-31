import React, { useEffect, useState } from "react"
import MyItemCard from "../item/MyItemCard"
// import "../home/productlist.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const ItemList = props => {
    const [items, setItems] = useState([])
    const { isAuthenticated } = useSimpleAuth()


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
    useEffect(getItems, [])

    return (
        <>
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