import { createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const serverUrl = import.meta.env.SERVER_URL || 'http://localhost:8082';

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
