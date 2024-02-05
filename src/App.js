import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Header from './components/Header';
import WeatherDetailsPage from './components/WeatherDetailsPage';
import './App.css'

function App() {
  const [showNav, setShowNav] = React.useState(false)
  return (
      <Router>
        <Header showNav={showNav}/>
        <div>
          <Routes>
            <Route path="/" element={<Homepage setShowNav={setShowNav}/>} />
            <Route path="/weather/:city" element={<WeatherDetailsPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
