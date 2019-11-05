import React, {useState} from "react";
import { Button, Modal } from 'reactstrap';


const ItemEditForm = props => {

    const {
        className
      } = props;

      const [modal, setModal] = useState(false);
      const [quantity, setQuantity] = useState("");




      const toggle = () => {
        setModal(!modal)
        setQuantity(props.item.quantity)

      }


  const handleEdit = (e) => {
    e.preventDefault()
    const editQuantity = {
        quantity: quantity,
    }


    fetch(`http://localhost:8000/items/${props.item.id}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("foundit_token")}`
        },
        body: JSON.stringify(editQuantity)


      })
      .then(() => props.getItemQuantity(props.item.id))
      .then(() => toggle())
    }

    return (
        <>
            <Button color="success" onClick={toggle}>Edit Quantity</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
            {/* Edit Quantity Form */}
            <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleEdit}>
                {/* <div className="card"> */}
                {/* <div className="card-body"> */}
                {/* <h1 className="card-title h3 mb-3 font-weight-normal">Enter in New Quantity</h1> */}
                <fieldset className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                    type="number"
                    name= "quantity"
                    required
                    className="form-control"
                    id="quantity"
                    placeholder="Quantity"
                    onChange = {e => setQuantity(e.target.value)}
                    value={quantity}
                    />
                </fieldset>
                <fieldset>
                <button type="submit">Submit</button>
                </fieldset>
                {/* </div> */}
                {/* </div> */}
            </form>
            </main>
            </Modal>

        </>
      );
    };

    export default ItemEditForm;