import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
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
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<Products />} />
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
