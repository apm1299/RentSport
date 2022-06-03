import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/homePage/HomePage'
import { LoginPage } from './pages/loginPage/LoginPage';
import { NotFoundPage } from './pages/notFoundPage/NotFoundPage';
import { Layout } from "./components/home/layout/Layout";
import { CenterPage } from "./pages/centerPage/CenterPage"
import { RegisterPage } from './pages/register/RegisterPage'
import { ProfilePage } from './pages/profilePage/ProfilePage'

import './index.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< Layout />}>
            <Route index element={< HomePage />}/>
            <Route path='/centro/:id' element={< CenterPage />}/>
            <Route path='/perfil' element={< ProfilePage />}/>
          </Route>
          <Route path='/entrar' element={< LoginPage />}></Route>
          <Route path='/registro' element={< RegisterPage />}></Route>
          <Route path='*' element={< NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

