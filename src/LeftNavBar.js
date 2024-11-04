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
        </div>
    );
};

export default LeftNavBar;

