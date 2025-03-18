import AdminLayout from './admilayout/AdminLayout';
import Dashboard from './admincomponents/Dashbord';
import Adminhome from './adminpage/adminhome';
import './index.css';
import Home from './page/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



  function App() {
    return (
      <>
      {/* Customer Routes Start */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {/* <Routes>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes> */}
      </Router>
      {/* Customer Routes End */}

      {/* Admin Routes Start */}
      <Router>
        <Routes>
          <Route path="/admin" element={<Adminhome children={<Dashboard/>}/>} />
        </Routes>
        <Routes>
          <Route path="/subcategories" element={<Adminhome children={<Home/>}/>} />
        </Routes>
       
      </Router>
      </>
    );
  
}

export default App;
