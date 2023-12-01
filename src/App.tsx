import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Product from './pages/productView/ProductView';
import ProductsQuery from './pages/Products/ProductsQuery';
import ProductView from './pages/productView/ProductView';
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const Products = lazy(() => import('./pages/Products/Products'));

function App() {
  const { t } = useTranslation();

  return (
    <>
      <BrowserRouter>
        <div className="header">
          <Header />
        </div>

        <div className="container">
          <Routes>
            <Route path="/" element={<ProductsQuery />} />
            <Route path="/products" element={<ProductsQuery />} />
            <Route path="/product/:slug" element={<ProductView />} />
            <Route path="*" element={<ProductsQuery />} />
          </Routes>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
