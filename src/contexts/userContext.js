import { createContext, useContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export const UserContext = createContext();

export const UserProvider = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage('user', {});
  const userLoginHandler = (userData) => {
    setUser(userData);
  }

  const userLogoutHandler = () => {
    setUser({});
  }

  return (
    <UserContext.Provider value={{
      user,
      userLoginHandler,
      userLogoutHandler,
      isAuthenticated: !!user.accessToken
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};