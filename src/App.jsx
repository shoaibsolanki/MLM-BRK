import AdminLayout from './admilayout/AdminLayout';
import Dashboard from './admincomponents/Dashbord';
import Adminhome from './adminpage/adminhome';
import './index.css';
import Home from './page/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Support from './page/Support';
import Login from './AdminPages/Login';
import Category from './adminpage/Category';
import SubCategoryPage from './adminpage/SubCategoryPage';



  function App() {
    return (
      <>
      {/* Customer Routes Start */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/support" element={<Support />} />
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
