import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext';
import { UserContextProvider } from './context/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
