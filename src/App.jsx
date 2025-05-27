import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from "./components/Dashboard";
import Deskticket from './components/Deskticket';
import Loading from './components/Loading';
function App() {

  return (
      <div>
        <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/ticket" element={<Deskticket />} />
        </Routes>
        </Router>
      </div>
  )
}

export default App
