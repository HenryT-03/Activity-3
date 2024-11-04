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
  });

  const [viewer, setViewer] = useState(0); // by default, homepage catalog
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/products.json");
      const data = await response.json();
      const responseCategories = await fetch("/categories.json");
      const dataCategories = await responseCategories.json();
      setCategories(dataCategories);
      setCatalog(data);
      setFilteredCatalog(data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <LeftNavBar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Catalog cart={cart} setCart={setCart} cartTotal={cartTotal} setCartTotal={setCartTotal} />} />
            <Route path="Payment" element={<Payment dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer} cart={cart} />} />
            <Route path="Summary" element={<Summary dataF={dataF} setDataF={setDataF} setViewer={setViewer} cart={cart} setCart={setCart} cartTotal={cartTotal} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
