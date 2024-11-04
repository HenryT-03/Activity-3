
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"


function Summary({ dataF, setDataF, setViewer, cart, setCart, cartTotal }) {
    const navigate = useNavigate();

    // Render cart items
    const cartItems = cart.map((item, index) => (
        <div key={index}>
            <img className="img-fluid" src={item.image} width={150} alt={item.title} />
            {item.title} - ${item.price}
        </div>
    ));

    // Reset viewer and payment form data on submission
    const updateHooks = () => {
        setViewer(1);
        setDataF({
            fullName: '',
            email: '',
            creditCard: '',
            address: '',
            address2: '',
            city: '',
            state: '',
            zip: ''
        });

        setCart([])
        navigate("/");  // Navigate back to the homepage after submission
    };
    console.log(dataF)

    return (
        <div>
            <div>
                <h1>Your Cart Confirmation</h1>
                <div>{cartItems}</div>
                <h1> Price: {cartTotal}</h1>
            </div>
            <h1>Payment Summary:</h1>
            <h3>{dataF.fullName}</h3>
            <p>Email: {dataF.email}</p>
            <p>Credit Card: **** **** **** {dataF.creditCard.slice(-4)}</p>
            <p>Address: {dataF.address} {dataF.address2}</p>
            <p>Location: {dataF.city}, {dataF.state} {dataF.zip}</p>
            <button onClick={updateHooks} className="btn btn-secondary">Submit</button>
        </div>
    );
}

export default Summary;