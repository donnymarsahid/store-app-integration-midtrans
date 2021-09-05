import { createContext, useReducer } from 'react';

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH_SUCCESS':
      return {
        isLogin: true,
        user: payload,
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case 'AUTH_ERROR':
      return {
        isLogin: false,
        user: {},
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
};
