import React from 'react';
import ConfigContextProvider from './context/ConfigContext';
import ThemeContextProvider from './context/ThemeContext';
import StatusContextProvider from './context/StatusContext';
import Layout from './pages/Layout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AuthProvider from './context/AuthContext';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <ConfigContextProvider>
        <StatusContextProvider>
          <ThemeContextProvider>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="dashboard" element={<Dashboard />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </ThemeContextProvider>
        </StatusContextProvider>
      </ConfigContextProvider>
    </div>
  );
};

export default App;
