import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import HomePageComponent from './Components/HomePageComponent/HomePageComponent';
import AddPageComponent from './Components/AddPageComponent/AddPageComponent';
import EditPageComponent from './Components/EditPageComponent/EditPageComponent';
import DeletePageComponent from './Components/DeletePageComponent/DeletePageComponent';

const App = () => {
  return (
    <Router>
            <div className="container">
              <h1>NEWS APP</h1>
              
            <nav className="nav-menu">
                <Link to="/" className="gray-bg">HOME</Link>
                <Link to="/admin/add" className="gray-bg">ADD NEWS</Link>
                <Link to="/admin/edit" className="gray-bg" >EDIT NEWS</Link>
                <Link to="/admin/delete" className="gray-bg" >DELETE NEWS</Link>
            </nav>
           <Routes>
                 <Route exact path='/' element={<HomePageComponent/>}></Route>
                 <Route path='/admin/add' element={<AddPageComponent/>}></Route>
                 <Route path='/admin/edit' element={<EditPageComponent/>}></Route>
                 <Route path='/admin/delete' element={<DeletePageComponent/>}></Route>
          </Routes>
          </div>
       </Router>
  );
}

export default App