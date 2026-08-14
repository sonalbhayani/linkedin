import { createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const serverUrl = 'http://localhost:8082';
    let value = {
        serverUrl
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
