import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';
import { SocketContextProvider } from './context/SocketContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <UserContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
