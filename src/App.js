import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Button } from 'react-bootstrap';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  function handleSearch(e){
    e.preventDefault();
    setSearchQuery(e.target.value);
    setPage(1);

  }

  useEffect(() => {
    fetchProducts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery, page]);

  const fetchProducts = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    const allProducts = response.data;
    const filteredProducts = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const newProducts = page === 1 ? filteredProducts : [...products, ...filteredProducts];
    setProducts(newProducts);
  };

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };

  return (
    <div className='container' > 

      <input type="text" value={searchQuery}  onChange={handleSearch}/>
    
      

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Title</th>
           
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td><img src={product.image} alt={product.title} height={"90px"} /></td>
              <td>{product.title}</td>
              
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;
