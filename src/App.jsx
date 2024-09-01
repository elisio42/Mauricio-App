import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ClientProvider } from './context/ClientContext';
import CreateClientForm from './pages/form/CreateClientForm';
import SignInForm from './pages/form/SignInForm';
import SignUpForm from './pages/form/SignUpForm';
import PrivateRoutes from './pages/proteted/PrivateRoute'
import SignPage from './pages/SignPage';
import Dashboard  from './pages/auth/Dashboard';
import { TooltipProvider } from './components/ui/tooltip';
import RegisterPage from './pages/RegisterPage';



function App() {
  return (
    <UserProvider>
      <TooltipProvider>
      <ClientProvider>
        <Router>
          <Routes>
            <Route path='/sign-up' element={<SignInForm />} />
            <Route path='/' element={<SignPage />}/>
            <Route element={<PrivateRoutes />}>
              <Route path="/cadastrar" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </ClientProvider>
      </TooltipProvider>
    </UserProvider>
  );
}

export default App;
