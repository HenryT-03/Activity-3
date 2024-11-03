import logo from './logo.svg';
import React, {useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Summary from "./MySummary.js"
import Catalog from "./Catalog.js"
import Payment from "./MyPayment.js"
import LeftNavBar from './LeftNavBar.js';

import './App.css';

function ShowProducts({ catalog }) {
  return (
    <div className="row">
      {catalog.map((product) => (
        <div key={product.id} className="col-md-4">
          <div className="card mb-4">
            <img
              src={product.image}
              className="card-img-top"
              style={{ width: "150px", margin: "auto", paddingTop: "20px" }}
              alt={product.title}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">
                <strong>Price:</strong> ${product.price} <br />
                <strong>Description:</strong> {product.description} <br />
                <strong>Category:</strong> {product.category} <br />
                <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {

  const [dataF, setDataF] = useState({
    fullName: '',
    email: '',
    creditCard: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  })

  const [viewer, setViewer] = useState(0); // by default, homepage catalog
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch("/products.json");
      const data = await response.json();
      const responseCategories = await fetch("/categories.json");
      const dataCategories = await responseCategories.json();
      setCategories(dataCategories);
      console.log(dataCategories);
      setCatalog(data);
      setFilteredCatalog(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={
          <div>
          <LeftNavBar>
            catalog={catalog}
            setCatalog={setCatalog}
            filteredCatalog={filteredCatalog}
            setFilteredCatalog={setFilteredCatalog}
        </LeftNavBar>
        <div>
          <h1> Product Page </h1>
          <ShowProducts catalog={filteredCatalog}></ShowProducts>
        </div>
        </div>}></Route> */}
        <Route path= "/" element={<Catalog></Catalog>}></Route>
        <Route path="Catalog" element={<Catalog></Catalog>}> </Route>
        <Route path="Payment" element={<Payment dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}></Payment>}></Route>
      </Routes>
    </Router>
  )
  // return (<div>
  //   <Payment dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}></Payment>
  //   <Summary dataF={dataF} setDataF={setDataF} setViewer={setViewer}></Summary>
  // </div>)
}

export default App;
