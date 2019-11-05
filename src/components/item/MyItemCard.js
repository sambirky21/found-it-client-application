import React from "react"
import {Link} from "react-router-dom"
import "./MyItemCard.css"

const MyItemCard = props => {

    //Author: Sam Birky
    //Purpose: Show items to user as a card with name displayed
    //Methods: Takes one item and displays them to the DOM as a card and link that sends user to the product details page

    return (
        <>
        <div className="wrapper">
            <div className="card">
                <h1>
                <Link className="NavLink" to={`/item/${props.item.id}`}><span class="enclosed">{props.item.name}</span></Link>
                </h1>
                <h5 class="enclosed">Quantity: {props.item.quantity}</h5>
            </div>
        </div>
        <br></br><br></br>
            {/* <section className="itemList">
                <Link className="NavLink" to={`/item/${props.item.id}`}>
                <h3>{props.item.name}</h3>
                </Link>
                <h5>Quantity: {props.item.quantity}</h5>
            </section> */}
        </>
    )
}

export default MyItemCard