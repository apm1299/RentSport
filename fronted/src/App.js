import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/homePage/HomePage'
import { LoginPage } from './pages/loginPage/LoginPage';
import { NotFoundPage } from './pages/notFoundPage/NotFoundPage';
import { Layout } from "./components/home/layout/Layout";
import { CenterPage } from "./pages/centerPage/CenterPage"
import { RegisterPage } from './pages/register/RegisterPage'
import { ProfilePage } from './pages/profilePage/ProfilePage'
import { IncomePage } from './pages/incomePage/IncomePage'
import AuthRoute from "./routes/AuthRoute";
import { ProtectedRoute, RequireAuth } from "./routes";
import './index.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route
          path='/'
          element={
            <AuthRoute>
              <Outlet/>
            </AuthRoute>
          }
        >
          <Route path='/entrar' element={< LoginPage />}></Route>
          <Route path='/registro' element={< RegisterPage />}></Route>
        </Route>
          <Route path='/'           
          element={
            <RequireAuth>
              <Layout/>
            </RequireAuth>
          }
        >
            <Route index element={< HomePage />}/>
            <Route path='/centro/:id' element={< CenterPage />}/>
            <Route path='/perfil' element={< ProfilePage />}/>
            <Route
            path='/ingresos'
            element={
              <ProtectedRoute roles={['ROLE_ADMIN','ROLE_SUPERADMIN']}>
                <IncomePage />
              </ProtectedRoute>
            }
          />
          </Route>

          <Route path='*' element={< NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

