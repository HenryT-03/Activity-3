import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import React from 'react';
import "bootstrap/dist/css/bootstrap.css"

function Payment({ setDataF, setViewer })
{
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data =>
    {
        console.log(data);
        console.log(data.fullName);
        setDataF(data);
        setViewer(1);
    }

    return (<div>
        <div>
            <h1> Your Cart </h1>
            
        </div>

    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
        <div className="form-group">
            <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control" />
            {errors.fullName && <p className="text-danger">Full Name is required.</p>}
        </div>
        <div>
        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
        {errors.email && <p>Email is required.</p>}
        </div>
        <div>
        <input {...register("creditCard", { required: true })} placeholder="Credit Card" />
        {errors.creditCard && <p>Credit Card is required.</p>}
        </div>
        <div>
        <input {...register("address", { required: true })} placeholder="Address" />
        {errors.address && <p>Address is required.</p>}
        </div>
        <div>
        <input {...register("address2")} placeholder="Address 2" />
        </div>
        <div>
        <input {...register("city", { required: true })} placeholder="City" />
        {errors.city && <p>City is required.</p>}
        </div>
        <div>
        <input {...register("state", { required: true })} placeholder="State" />
        {errors.state && <p>State is required.</p>}
        </div>
        <div>
        <input {...register("zip", { required: true })} placeholder="Zip" />
        {errors.zip && <p>Zip is required.</p>}
        </div>

        <button type="submit">Submit</button>
    </form>
    </div>)
}
export default Payment;