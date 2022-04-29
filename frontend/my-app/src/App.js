import './App.css';
import React,{useState} from 'react';
import AddPenyakit from './/Input/Addpenyakit';
import Masukan from './Input/Masukan';
import SearchFilter from './Input/SearchFilter';
import NavBar from './Input/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () =>{
  return (
    <Router>
      <div className="Main">
        <NavBar/>
        <div className="Mainkonten">
          <Routes>
            <Route exact path="/" element={<AddPenyakit/>} />
            <Route path="/addPenyakit" element={<AddPenyakit/>} />
            <Route path="/testDNA" element={<Masukan/>} />
            <Route path="/searchFilter" element={<SearchFilter/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
