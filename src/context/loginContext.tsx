import { createContext, ReactNode, useContext, useState } from "react";

interface LoginContext {
  isLogin: boolean;
  login: (password: string) => void;
  logout: () => void;
}

const loginContext = createContext<LoginContext | undefined>(undefined);

export const useLoginContext: () => LoginContext = () => {
  const context = useContext(loginContext);
  if (context !== undefined) {
    return context;
  }
  throw new Error("");
};

export const LoginContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLogin, setIsLogin] = useState(false);

  const login = (password: string) => {
    if (password === "Admin_password") {
      setIsLogin(true);
    } else {
      throw new Error("Password is incorrect!");
    }
  };

  const logout = () => {
    setIsLogin(false);
  };

  return (
    <loginContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </loginContext.Provider>
  );
};
