import React from 'react';

import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from "./components/Home"
import Exchanges from './components/ExchangesPage';
import Coins from './components/CoinsPage';
import CoinDetail from './components/CoinDetail';

function App() {
  return (
    <Router>
        <Header/> 
        <Routes>
          <Route/>
          <Route path='/' element={<Home/>}  />
          <Route path='/exchanges' element={<Exchanges/>}  />
          <Route path='/coins' element={<Coins/>}  />
          <Route path='/coins/:id' element={<CoinDetail/>}  />
        </Routes>
    </Router>
    
    

  );
}

export default App;
