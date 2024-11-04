import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

const Catalog = () => {
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]); // State for filtered catalog
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const filterCategory = (tag) => {
        const results = catalog.filter((product) => product.category === tag);
        setFilteredCatalog(results);
    };

    const clearSearch = () => {
        setSearchTerm(""); // Clear the input
        setFilteredCatalog(catalog); // Reset to full catalog
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        const results = catalog.filter(eachProduct => {
            if (e.target.value === "") return catalog;
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredCatalog(results);
    };

    const listItems = filteredCatalog.map((item) => (
        <div className="row border-top border-bottom" key={item.id}>
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={item.image} alt={item.title} />
                </div>
                <div className="col">
                    <div className="row text-muted">{item.title}</div>
                    <div className="row">{item.category}</div>
                </div>
                <div className="col">
                    <button type="button" onClick={() => removeFromCart(item)}> - </button>
                    <button type="button" onClick={() => addToCart(item)}> + </button>
                </div>
                <div className="col">
                    ${item.price} <span className="close">&#10005;</span>{howManyItems(item.id)}
                </div>
            </div>
        </div>
    ));

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (item) => {
        let itemFound = false;
        const updatedCart = cart.filter((cartItem) => {
            if (item.id === cartItem.id && !itemFound) {
                itemFound = true;
                return false;
            }
            return true;
        });
        if (itemFound) {
            setCart(updatedCart);
        }
    };

    const cartItems = cart.map((item, index) => (
        <div key={index}>
            <img className="img-fluid" src={item.image} width={150} alt={item.title} />
            {item.title} ${item.price}
        </div>
    ));

    useEffect(() => {
        const total = () => {
            let totalAmount = 0;
            for (let i = 0; i < cart.length; i++) {
                totalAmount += cart[i].price;
            }
            setCartTotal(totalAmount);
        };
        total();
    }, [cart]);

    useEffect(() => {
        const fetchData = async () => {
            const someResponse = await fetch("./products.json");
            const data = await someResponse.json();
            setCatalog(data);
            setFilteredCatalog(data); // Initialize filtered catalog
        };
        fetchData();
    }, []);

    function howManyItems(id) {
        return cart.filter((cartItem) => cartItem.id === id).length;
    }

    const navigate = useNavigate();

    return (
        <div>
            <h2>STORE SE/ComS3190</h2>

            {/* Category Filter Buttons */}
            <div className="mb-4">
                <p>Categories:</p>
                <div className="d-flex flex-wrap">
                    <Button
                        variant="warning"
                        className="mb-2 me-2 btn-sm"
                        onClick={() => filterCategory("electronics")}
                    >
                        Electronics
                    </Button>
                    <Button
                        variant="warning"
                        className="mb-2 me-2 btn-sm"
                        onClick={() => filterCategory("jewelery")}
                    >
                        Jewelry
                    </Button>
                    <Button
                        variant="warning"
                        className="mb-2 me-2 btn-sm"
                        onClick={() => filterCategory("men's clothing")}
                    >
                        Men's Clothing
                    </Button>
                    <Button
                        variant="warning"
                        className="mb-2 me-2 btn-sm"
                        onClick={() => filterCategory("women's clothing")}
                    >
                        Women's Clothing
                    </Button>
                    <Button
                        variant="secondary"
                        className="mb-2 me-2 btn-sm"
                        onClick={clearSearch}
                    >
                        Clear Filter
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
                onChange={handleChange}
            />

            {/* Shopping Cart */}
            <div className="card">
                <div className="row">
                    <div className="col-md-8 cart">
                        <div className="title">
                            <div className="row">
                                <div className="col">
                                    <h4>
                                        <b>3190 Shopping Cart</b>
                                        <button onClick={() => navigate("/Payment")}>Purchase Cart</button>
                                    </h4>
                                </div>
                                <div className="col align-self-center text-right text-muted">
                                    <h4><b>Products selected: {cart.length}</b></h4>
                                </div>
                                <div className="col align-self-center text-right text-muted">
                                    <h4><b>Order total: ${cartTotal}</b></h4>
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

export default Catalog;