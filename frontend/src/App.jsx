
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Home from './pages/home';
import AuthContextProvider from './context/AuthContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
