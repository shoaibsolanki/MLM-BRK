// import AdminLayout from './admilayout/AdminLayout';
import Dashboard from './admincomponents/Dashbord';
import Adminhome from './adminpage/Adminhome';
import './index.css';
import Home from './page/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Support from './page/Support';
import Layout from './Layout/Layout';
import ProductsPage from './page/ProductsPage';
import ProductDetailPage from './page/ProductDetailPage';
import Login from './AdminPages/Login';
import Category from './adminpage/Category';
import SubCategoryPage from './adminpage/SubCategoryPage';
import NotFound from './components/NotFound';
import AddProduct from './adminpage/Addproduct';
import ProtectedRouteForAdmin from './ProtectedRouteForAdmin';
import Allproduct from './adminpage/Allproduct';
import AddsubProduct from './adminpage/AddsubProduct';



  function App() {
    return (
      <>
    {/* Combined Routes Start */}
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:categoryId" element={<ProductsPage />} />
          <Route path="products/:categoryId/:subcategoryId" element={<ProductsPage />} />
          <Route path="product/:productId" element={<ProductDetailPage />} />
          <Route path="/support" element={<Support />} />
        </Route>

        {/* Admin Routes */}
        
        <Route path="/admin" element={<ProtectedRouteForAdmin Component={Adminhome} />}>
          <Route index element={< ProtectedRouteForAdmin Component={ Dashboard} />} />
          <Route path="categories" element={<ProtectedRouteForAdmin Component={ Category} />} />
          <Route path="subcategories" element={<ProtectedRouteForAdmin Component={ SubCategoryPage} />} />
          <Route path="products/add" element={<ProtectedRouteForAdmin Component={ AddProduct} />} />
          <Route path="products/list" element={<ProtectedRouteForAdmin Component={ Allproduct} />} />
          <Route path="subproducts/add" element={<ProtectedRouteForAdmin Component={ AddsubProduct} />} />
        </Route>
        <Route path='/admin/login' element={<Login />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
    {/* Combined Routes End */}
      </>
    );
  
}

export default App;
