import React, { useState } from 'react';
import { ConfigContext } from './context/ConfigContext';
import UseConfig from './hooks/UseConfig';
import { ThemeContext } from './context/ThemeContext';
import { StatusContext } from './context/StatusContext';
import Layout from './pages/Layout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AuthProvider from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import useTheme from './hooks/UseTheme';
import { Status } from './types/Status';

const App: React.FC = () => {
  const {config, updateConfig} = UseConfig('config');
  const [status, setStatus] = useState<Status>('waiting');
  const [theme, updateTheme] = useTheme();

  return (
    <div className="wrapper">
      <ConfigContext.Provider value={{config, updateConfig}}>
        <StatusContext.Provider value={[status, setStatus]}>
          <ThemeContext.Provider value={[theme, updateTheme]}>
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
          </ThemeContext.Provider>
        </StatusContext.Provider>
      </ConfigContext.Provider>
    </div>
  );
};

export default App;
