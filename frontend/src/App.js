import SignIn from './components/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './index.css'; // Import the index.css to ensure styles are applied

function App() {
  return (
    <div className="App" style={{height: '100%'}}> 
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
