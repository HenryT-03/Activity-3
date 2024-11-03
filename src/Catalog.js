import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Catalog = () =>
{
    const[catalog, setCatalog] = useState([]);
    const[cart, setCart] = useState([]);
    const[cartTotal, setCartTotal] = useState(0);
    const[searchTerm, setSearchTerm] = useState("");

    const filteredCatalog = catalog.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const listItems = filteredCatalog.map((item) =>
        <div class="row border-top border-bottom" key={item.id}>
            <div class="row main align-items center">
                <div class="col-2">
                    <img class="img-fluid" src={item.image}></img>
                </div>
                <div class="col">
                    <div class="row text-muted">{item.title}</div>
                    <div class="row">{item.category}</div>
                </div>
                <div class="col">
                    <button type="button" variant="light" onClick={() => removeFromCart(item)}> - </button>
                    <button type="button" variant="light" onClick={() => addToCart(item)}> + </button>
                </div>
                <div class="col">
                    ${item.price} <span class="close">&#10005;</span>{howManyItems(item.id)}
                </div>
            </div>
        </div>
    );

    const addToCart = (item) =>
    {
        setCart([...cart, item]);
    };

    const removeFromCart = (item) =>
    {
        let itemFound = false;
        const updatedCart = cart.filter((cartItem) => {
            if (item.id === cartItem.id && !itemFound)
            {
                itemFound = true;
                return false;
            }
            return true;
        })
        if (itemFound)
        {
            setCart(updatedCart);
        }
    };

    const cartItems = cart.map((item, index) =>
    {
        <div key={index}>
            <img class="img-fluid" src={item.image} width={150}>
            {item.title}
            ${item.price}
            </img>
        </div>
    });

    useEffect(()=>{
        const total = () => {
            let totalAmount = 0;
            for (let i=0; i<cart.length; i++){
                totalAmount += cart[i].price;
            }
            setCartTotal(totalAmount);
            console.log(totalAmount);
        };
        total();
    },[cart]);

    useEffect(()=>{
        const fetchData = async () => {
            const someResponse = await fetch("./products.json");
            const data = await someResponse.json();
            // update State Variable
            setCatalog(data);
        };

        fetchData();
    },[]);

    function howManyItems(id) {
        let amount = cart.filter((cartItem) => cartItem.id === id);
        return amount.length;
    }

    const navigate = useNavigate()
    return (
        <div>
            STORE SE/ComS3190

            <input type="text" placeholder="Search Products" value={searchTerm} style={{width: '100%', padding: '10px', marginBottom: '20px'}}
            onChange={(e) => setSearchTerm(e.target.value)}>
            </input>
            <div class="card">
                <div class="row">
                    {/* HERE, IT IS THE SHOPING CART */}
                    <div class="col-md-8 cart">
                        <div class="title">
                            <div class="row">
                                <div class="col">
                                    <h4>
                                        <b>3190 Shopping Cart</b>
                                        <button onClick={() => navigate("/Payment")}>Purchase Cart</button>
                                    </h4>
                                </div>
                                <div class="col align-self-center text-right text-muted">
                                    <h4>
                                        <b>Products selected {cart.length}</b>
                                    </h4>
                                </div>
                                <div class ="col align-self-center text-right text-muted">
                                    <h4>
                                        <b>Order total: ${cartTotal}</b>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div>{listItems}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog