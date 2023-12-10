import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/Home';
import ProductsPage from './pages/ProductPage';



import Menu from './components/Menu';
import { Header } from 'antd/es/layout/layout';
import ProductManagement from './pages/ProductManagement';

const App = () => {
  return (
    <>


      <Menu />
      <div className="">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/manage-product" element={<ProductManagement/>} />

        </Routes>
      </div>

    </>


  );
};

export default App;
