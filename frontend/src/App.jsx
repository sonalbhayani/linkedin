import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Home from './pages/home';
import { UserContext } from './context/UserContext';

const App = () => {
  const { user } = useContext(UserContext);




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
