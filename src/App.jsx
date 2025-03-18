import './index.css';
import Home from './page/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Support from './page/Support';



  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/support" element={<Support />} />
        </Routes>
      </Router>
    );
  
}

export default App;
