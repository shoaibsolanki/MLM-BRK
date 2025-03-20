import AdminLayout from './admilayout/AdminLayout';
import Dashboard from './admincomponents/Dashbord';
import Adminhome from './adminpage/adminhome';
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



  function App() {
    return (
      <>
      {/* Customer Routes Start */}
      <Router>
        {/* <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/support" element={<Support />} />
        </Routes> */}
         <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:categoryId" element={<ProductsPage />} />
          <Route path="products/:categoryId/:subcategoryId" element={<ProductsPage />} />
          <Route path="product/:productId" element={<ProductDetailPage />} />
          <Route path="/support" element={<Support />} />

        </Route>
      </Routes>
      </Router>
     
      {/* Customer Routes End */}

      {/* Admin Routes Start */}
      <Router>
        <Routes>
          <Route path="/admin" element={<Adminhome children={<Dashboard/>}/>} />
        </Routes>
       
        <Routes>
          <Route path="/categories" element={<Adminhome children={<Category/>}/>} />
        </Routes>
        <Routes>
          <Route path="/subcategories" element={<Adminhome children={<SubCategoryPage/>}/>} />
        </Routes>
         <Routes  >
          <Route path='/admin/login' element={<Login/>}/>
         </Routes>
      </Router>
      </>
    );
  
}

export default App;
