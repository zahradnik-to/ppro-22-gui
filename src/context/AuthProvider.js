import {createContext, useState, useMemo} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(null);
  const authValue = useMemo(() => ({auth, setAuth}), [auth, setAuth]);

  return(
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;