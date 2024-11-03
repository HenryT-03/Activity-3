
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"


function Summary({dataF, setDataF, setViewer })
{
    const updateHooks = ()=>
    {
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
    }
    return (
    <div>
        <h1>Payment summary:</h1>
        <h3>{dataF.fullName}</h3>
        <p>{dataF.email}</p>
        <p>{dataF.creditCard}</p>
        <p>{dataF.address} {dataF.address2}</p>
        <p>{dataF.city}{dataF.state} {dataF.zip} </p>
        <button onClick={updateHooks} className="btn btn-secondary">Submit</button>
    </div>);
};

export default Summary;