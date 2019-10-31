import React from "react"
import {Link} from "react-router-dom"
// import getProducts from "../product/ProductList"

const MyItemCard = props => {

    //Author: Sam Birky
    //Purpose: Show items to user as a card with name displayed
    //Methods: Takes one item and displays them to the DOM as a card and link that sends user to the product details page

    return (
        <>
            <section className="itemList">
                <Link className="NavLink" to={`/item/${props.item.id}`}>
                <h3>{props.item.name}</h3>
                </Link>
                <h5>Quantity: {props.item.quantity}</h5>
            </section>
        </>
    )
}

export default MyItemCard