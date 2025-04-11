import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './Layout/Layout';
import NotFound from './components/NotFound';
import ProtectedRouteForAdmin from './ProtectedRouteForAdmin';
import { CircularProgress } from '@mui/material';

// Lazy load components
const Home = lazy(() => import('./page/Home'));
const ProductsPage = lazy(() => import('./page/ProductsPage'));
const ProductDetailPage = lazy(() => import('./page/ProductDetailPage'));
const Support = lazy(() => import('./page/Support'));
const Cart = lazy(() => import('./page/Cart'));
const Checkout = lazy(() => import('./page/Checkout'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const CreateKyc = lazy(() => import('./components/KYC/CreateKyc'));



const CustomerRegstration = lazy(()=> import('./components/Registration/CustomerRegstration'))


const Login = lazy(() => import('./AdminPages/Login'));
const Adminhome = lazy(() => import('./adminpage/Adminhome'));
const Dashboard = lazy(() => import('./admincomponents/Dashbord'));
const Category = lazy(() => import('./adminpage/Category'));
const SubCategoryPage = lazy(() => import('./adminpage/SubCategoryPage'));
const AddProduct = lazy(() => import('./adminpage/Addproduct'));
const Allproduct = lazy(() => import('./adminpage/Allproduct'));
const AddsubProduct = lazy(() => import('./adminpage/AddsubProduct'));
const Subproductlist = lazy(() => import('./adminpage/Subproductlist'));
const DistributorCreate = lazy(() => import('./adminpage/Distibutorcreate'));
const Distibutorlist = lazy(() => import('./adminpage/Distibutorlist'));
const UserMange = lazy(() => import('./adminpage/UserMange'));
const OrderMange = lazy(() => import('./adminpage/OrderMange'));
const AddCombo = lazy(()=> import('./adminpage/Combomange'))
const Combolist = lazy(()=> import('./adminpage/Combolist'))
const Complaintlist = lazy(()=> import('./adminpage/Complaintlist'))
const Rpbonusemange = lazy(()=> import('./adminpage/Rpbonusemange'))
const Rptransactions = lazy(()=> import('./adminpage/Rptransactions'))
const Rpexchange = lazy(()=> import('./adminpage/Rpexchange'))
const Giftmange = lazy(()=> import('./adminpage/Mangegift'))
const CustomerTreeview = lazy(()=> import('./adminpage/CutomerTreeView'))
const Slider = lazy(()=> import('./adminpage/MangeSlider'))
const LeveWiseIncome = lazy(()=> import('./adminpage/Income/LeveWiseIncome'))
function App() {
  return (
    <>
      {/* Combined Routes Start */}
      
          <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress color='secondary'/></div>}>
            <Routes>
          {/* Customer Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />

              <Route path="products" element={<ProductsPage />} />
              <Route path="profile" element={<Profile />} />

              <Route path="products/:categoryId" element={<ProductsPage />} />
              <Route path="products/:categoryId/:subcategoryId" element={<ProductsPage />} />
              <Route path="product/:productId" element={<ProductDetailPage />} />
              <Route path="/support" element={<Support />} />
              <Route   path="/customer-registration/:organization/:referralCode" element={<CustomerRegstration />} />  
              <Route path="/cart" element={<Cart />} />
              <Route path="/kyc" element={<CreateKyc />} />



            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRouteForAdmin Component={Adminhome} />}>
              <Route index element={<ProtectedRouteForAdmin Component={Dashboard} />} />
              <Route path="categories" element={<ProtectedRouteForAdmin Component={Category} />} />
              <Route path="subcategories" element={<ProtectedRouteForAdmin Component={SubCategoryPage} />} />
              <Route path="products/add" element={<ProtectedRouteForAdmin Component={AddProduct} />} />
              <Route path="products/list" element={<ProtectedRouteForAdmin Component={Allproduct} />} />
              <Route path="subproducts/add" element={<ProtectedRouteForAdmin Component={AddsubProduct} />} />
              <Route path="subproducts/list" element={<ProtectedRouteForAdmin Component={Subproductlist} />} />
              <Route path="distributors/add" element={<ProtectedRouteForAdmin Component={DistributorCreate} />} />
              <Route path="distributors/list" element={<ProtectedRouteForAdmin Component={Distibutorlist} />} />
              <Route path="users" element={<ProtectedRouteForAdmin Component={UserMange} />} />
              <Route path="orders" element={<ProtectedRouteForAdmin Component={OrderMange} />} />
              <Route path="combo/add" element={<ProtectedRouteForAdmin Component={AddCombo} />} />
              <Route path="combo/list" element={<ProtectedRouteForAdmin Component={Combolist} />} />
              <Route path="Complaint" element={<ProtectedRouteForAdmin Component={Complaintlist} />} />
              <Route path="bonus" element={<ProtectedRouteForAdmin Component={Rpbonusemange} />} />
              <Route path="rp/transactions" element={<ProtectedRouteForAdmin Component={Rptransactions} />} />
              <Route path="rp/exchange" element={<ProtectedRouteForAdmin Component={Rpexchange} />} />
              <Route path="gift" element={<ProtectedRouteForAdmin Component={Giftmange} />} />
              <Route path="Cutomertree/:Custid" element={<ProtectedRouteForAdmin Component={CustomerTreeview} />} />
              <Route path="Slider" element={<ProtectedRouteForAdmin Component={Slider} />} />
              <Route path="income/:name" element={<ProtectedRouteForAdmin Component={LeveWiseIncome} />} />
            </Route>
            <Route path='/admin/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      {/* Combined Routes End */}
    </>
  );
}

export default App;