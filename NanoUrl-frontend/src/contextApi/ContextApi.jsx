import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const getToken = localStorage.getItem("JWT_TOKEN")
        ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
        : null;

    const [token, setToken] = useState(getToken);

    const logout = () => {
        setToken(null);
        localStorage.removeItem("JWT_TOKEN");
    };

    const sendData = {
        token,
        setToken,
        logout,
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>

}


export const useStoreContext = () => {
    const context = useContext(ContextApi);
    return context;
}