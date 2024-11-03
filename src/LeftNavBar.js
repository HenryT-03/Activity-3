import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import Logo from "./logo.png";

const LeftNavBar = ({ catalog, setFilteredCatalog, categories }) => {
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: "350px" }}>
            <div className="text-center mb-4">
                <img src={Logo} alt="Logo" className="img-fluid" />
            </div>

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
                </div>
            </div>

            

            <div className="mb-4">
                <InputGroup>
                    <FormControl
                        placeholder="Search products..."
                        aria-label="Search products"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <Button variant="outline-secondary" onClick={clearSearch}>
                        <i className="bi bi-x"></i>
                    </Button>
                </InputGroup>
            </div>
        </div>
    );
};

export default LeftNavBar;

