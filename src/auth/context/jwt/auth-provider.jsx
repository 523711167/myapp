import { useEffect, useReducer, useCallback, useMemo } from 'react';
//

import { AuthContext } from '@auth/context/jwt/auth-context';
import {
  isValidToken,
  setAccessTokenSession,
  setIdTokenSession,
  setRefreshTokenSession,
  setSession
} from '@auth/context/jwt/utils';
import axios, {API_ENDPOINTS} from "@utils/axios";


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
      await new Promise((resolve) => setTimeout(resolve, 500));

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
  const login = useCallback(async ({ username, password }) => {
    const data = {
      username,
      password,
      client_id: 'admin',
      client_secret: '123123',
      grant_type: 'password_admin',
      scope: 'openid'
    };

    const response = await axios.post(API_ENDPOINTS.auth.login,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
    );

    const { data: { access_token, refresh_token, id_token } } = response.data;

    setAccessTokenSession(access_token);
    setRefreshTokenSession(refresh_token)
    setIdTokenSession(id_token)

    dispatch({
      type: operationTypes.LOGIN,
      payload: {

      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email, password, firstName, lastName) => {
      // const data = {
      //   email,
      //   password,
      //   firstName,
      //   lastName,
      // };

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
