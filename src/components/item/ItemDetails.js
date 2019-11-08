import React, { useEffect, useState } from "react"
import ItemEditForm from "./EditDetails"
import { Button, Modal } from 'reactstrap';

const ItemDetails = props => {
    //Creat a state variable for single item - useState()
    const [item, setItem] = useState([])
    //Create a state variable for quantity editing later - useState()

    const getItemQuantity = (itemId) => {
        // Fetch the data from localhost:8000/item
        fetch(`http://localhost:8000/items/${itemId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("foundit_token")}`
            }
        })
            // Convert to JSON
            .then(response => response.json())

            // Store item in state variable
            .then((theItem) => {
                setItem(theItem)
            }, [])
    }
    // Create useEffect()
    useEffect(() => {
        getItemQuantity(props.itemId)}, [])

    const deleteItem = (id) => {
        fetch(`http://localhost:8000/items/${id}`, {
            "method": "DELETE",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("foundit_token")}`
            }
        })
            .then(() =>{
                alert("Your Item Has Been Deleted")
                props.history.push("/categories")
            })
    }

    //create HTML representation with JSX
    return (
        <>
        <h1 className="text-warning" >Item Details</h1>
        <div className="ItemDetails">
            <h2 className="text-warning">Name: {item.name}</h2>
            <h4 className="text-warning">Description: {item.description}</h4>
            <h4 className="text-warning">Location: {item.location}</h4>
            <h5 className="text-warning">Quantity: {item.quantity}</h5>

                <button className="btn btn-warning text-white" id={item.id} onClick={() => deleteItem(item.id)}
                    >Delete</button>
        </div>
        <ItemEditForm key={item.id} item={item} getItemQuantity={getItemQuantity}  {...props} />
        </>
    )
}


export default ItemDetails