import { useEffect, useReducer, useCallback, useMemo } from 'react';
//

import { AuthContext } from '@auth/context/jwt/auth-context';
import { isValidToken, setSession } from '@auth/context/jwt/utils';


const operationTypes = {
    INITIAL: 'INITIAL',
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER',
    LOGOUT: 'LOGOUT',
  };

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === operationTypes.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === operationTypes.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === operationTypes.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === operationTypes.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback( async () => {
    try {

      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = {
          data: {
            user: {
              id: 1,
              name: 'John Doe',
            },
          },
        }

        const { user } = response.data;

        dispatch({
          type: operationTypes.INITIAL,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: operationTypes.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: operationTypes.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();  
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const response = {
        data: {
            accessToken: '123',
            user: {
                id: 1,
                name: 'John Doe',
            },
        },
    }

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: operationTypes.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email, password, firstName, lastName) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      const response = {
        data: {
          accessToken: '123',
          user: {
            id: 1,
            name: 'John Doe',
          },
        },
      };

      const { accessToken, user } = response.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: operationTypes.REGISTER,
        payload: {
          user,
        },
      });

    }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: operationTypes.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(   
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
