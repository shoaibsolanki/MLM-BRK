import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './Layout/Layout';
import NotFound from './components/NotFound';
import ProtectedRouteForAdmin from './ProtectedRouteForAdmin';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./page/Home'));
const Gallery = lazy(() => import('./page/Gallery'));
const ProductsPage = lazy(() => import('./page/ProductsPage'));
const ProductDetailPage = lazy(() => import('./page/ProductDetailPage'));
const Support = lazy(() => import('./page/Support'));
const Cart = lazy(() => import('./page/Cart'));
const Checkout = lazy(() => import('./page/Checkout'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const CreateKyc = lazy(() => import('./components/KYC/CreateKyc'));
const Blog = lazy(() => import('./page/Blog'));



const CustomerRegstration = lazy(()=> import('./components/Registration/CustomerRegstration'))


const Login = lazy(() => import('./AdminPages/Login'));
const Adminhome = lazy(() => import('./adminpage/Adminhome'));
const AllGallery = lazy(() => import('./adminpage/Gallery/AllGallery'));

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
const Vieworder = lazy(()=> import('./admincomponents/Vieworder'))
const UserKYCScreen = lazy(()=> import('./admincomponents/ViewCustomerKyc'))
const InvoiceView = lazy(()=> import('./admincomponents/InvoiceView'))
const Kyclist = lazy(()=> import('./adminpage/Kyclist'))
const Uom = lazy(()=> import('./adminpage/Uom'))
const Testimonial = lazy(()=> import('./adminpage/Testimonial'))
const Addtestimonnial = lazy(()=> import('./adminpage/Addtestimonnial'))
const CreateAdminForm = lazy(()=> import('./adminpage/CreateAdminForm'))
const Wallet = lazy(()=> import('./adminpage/Wallet'))
const AddBlog = lazy(()=> import('./adminpage/Blog/AddBlog'))
const ViewBlog = lazy(()=> import('./adminpage/Blog/ViewBlogs'))
function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  ScrollToTop();
  return (
    <>
      {/* Combined Routes Start */}
      
          <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress color='secondary'/></div>}>
            <Routes>
          {/* Customer Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/gallery" element={<Gallery />} />   

              <Route path="products" element={<ProductsPage />} />
              <Route path="profile" element={<Profile />} />

              <Route path="products/:categoryId" element={<ProductsPage />} />
              <Route path="products/:categoryId/:subcategoryId" element={<ProductsPage />} />
              <Route path="product/:productId" element={<ProductDetailPage />} />
              <Route path="/support" element={<Support />} />
              <Route   path="/customer-registration/:organization/:referralCode" element={<CustomerRegstration />} />  
              <Route path="/cart" element={<Cart />} />
              <Route path="/kyc" element={<CreateKyc />} />
              <Route path="/Blog" element={<Blog />} />





            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRouteForAdmin  page="Dashboard" index="0" Component={Adminhome} />}>
              <Route index element={<ProtectedRouteForAdmin page="Dashboard" index="0" Component={Dashboard} />} />
              <Route path="categories" element={<ProtectedRouteForAdmin page="Category" index="1" Component={Category} />} />
              <Route path="subcategories" element={<ProtectedRouteForAdmin page="Category" index="1" Component={SubCategoryPage} />} />
              <Route path="products/add" element={<ProtectedRouteForAdmin page="Product" index="2" Component={AddProduct} />} />
              <Route path="products/list" element={<ProtectedRouteForAdmin page="Product" index="2" Component={Allproduct} />} />
              <Route path="subproducts/add" element={<ProtectedRouteForAdmin page="Product" index="2" Component={AddsubProduct} />} />
              <Route path="subproducts/list" element={<ProtectedRouteForAdmin page="Product" index="2" Component={Subproductlist} />} />
              {/* <Route path="combo/add" element={<ProtectedRouteForAdmin page="Product" index="2"  Component={AddCombo} />} /> */}
              {/* <Route path="combo/list"  element={<ProtectedRouteForAdmin page="Product" index="2" Component={Combolist} />} /> */}
              <Route  path="AllGallery" element={<ProtectedRouteForAdmin page="Gallery" index="3" Component={AllGallery} />} />

              <Route path="distributors/add" element={<ProtectedRouteForAdmin page="Distributor" index="4" Component={DistributorCreate} />} />
              <Route path="distributors/list" element={<ProtectedRouteForAdmin page="Distributor" index="4" Component={Distibutorlist} />} />
              <Route path="users" element={<ProtectedRouteForAdmin page="User" index="5" Component={UserMange} />} />
              <Route path="Cutomertree/:Custid" element={<ProtectedRouteForAdmin page="User" index="5" Component={CustomerTreeview} />} />
              <Route path="orders" element={<ProtectedRouteForAdmin page="Order" index="6" Component={OrderMange} />} />
              <Route path="vieworder/:id" element={<ProtectedRouteForAdmin page="Order" index="6" Component={Vieworder} />} />
              <Route path="InvoiceView/:id" element={<ProtectedRouteForAdmin page="Order" index="6" Component={InvoiceView} />} />
              <Route path="Complaint" element={<ProtectedRouteForAdmin Component={Complaintlist} />} />
              <Route path="bonus" element={<ProtectedRouteForAdmin page="Bonus" index="7" Component={Rpbonusemange} />} />
              <Route path="rp/transactions" element={<ProtectedRouteForAdmin page="RpTransactions" index="8" Component={Rptransactions} />} />
              <Route path="rp/exchange" element={<ProtectedRouteForAdmin page="RpExchange" index="9" Component={Rpexchange} />} />
              <Route path="gift" element={<ProtectedRouteForAdmin page="Complaint" index="10" Component={Giftmange} />} />
              <Route path="Slider" element={<ProtectedRouteForAdmin page="Slider" index="11" Component={Slider} />} />
              <Route path="KYC" element={<ProtectedRouteForAdmin page="KYC" index="12" Component={Kyclist} />} />
              <Route path="userkyc/:id" element={<ProtectedRouteForAdmin page="KYC" index="12" Component={UserKYCScreen} />} />
              <Route path="income/:name" element={<ProtectedRouteForAdmin page="Income" index="13" Component={LeveWiseIncome} />} />
              <Route path="uom" element={<ProtectedRouteForAdmin page="Unit" index="15" Component={Uom} />} />
              <Route path="testimonial/view" element={<ProtectedRouteForAdmin page="Testimonial" index="16" Component={Testimonial} />} />
              <Route path="testimonial/add" element={<ProtectedRouteForAdmin page="Testimonial" index="16" Component={Addtestimonnial} />} />
              <Route path="Wallet" element={<ProtectedRouteForAdmin page="Wallet" index="17" Component={Wallet} />} />
              <Route path="AddBlog" element={<ProtectedRouteForAdmin page="Blog" index="18" Component={AddBlog} />} />
              <Route path="ViewBlog" element={<ProtectedRouteForAdmin page="Blog" index="18" Component={ViewBlog} />} />
              <Route path="Crete_admin" element={<ProtectedRouteForAdmin Component={CreateAdminForm} />} />
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