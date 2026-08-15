import { createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const serverUrl = 'https://linkedin-x8re.onrender.com';

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
