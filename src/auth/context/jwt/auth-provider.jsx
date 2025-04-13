import {useEffect, useReducer, useCallback, useMemo} from 'react';
//

import {AuthContext} from '@auth/context/jwt/auth-context';
import {
    isRequireRefresh,
    isValidToken, jwtDecode,
    setAccessTokenSession,
    setIdTokenSession,
    setRefreshTokenSession,
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
    // 首次渲染loading组件，然后执行AuthProvider副作用
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

export function AuthProvider({children}) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const initialize = useCallback(async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            const accessToken = sessionStorage.getItem(STORAGE_KEY);

            if (accessToken && isValidToken(accessToken)) {
                setAccessTokenSession(accessToken);

                const { data } = await axios.post(
                    API_ENDPOINTS.auth.userinfo,
                );

                dispatch({
                    type: operationTypes.INITIAL,
                    payload: {
                        user: data?.data?.sub
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
    const login = useCallback(async ({username, password}) => {
        const data = {
            username,
            password,
            client_id: 'admin',
            client_secret: '123123',
            grant_type: 'password_admin',
            scope: 'openid'
        };

        const response = await axios.postForm(
            API_ENDPOINTS.auth.login,
            data,
            {
                headers: {
                    'authorization': '',
                }
            }
        );

        const {data: {access_token, refresh_token, id_token}} = response.data;

        setAccessTokenSession(access_token);
        setRefreshTokenSession(refresh_token)
        setIdTokenSession(id_token)
        const claims = jwtDecode(access_token);

        dispatch({
            type: operationTypes.LOGIN,
            payload: {
                username: claims.sub,
                scope: [...claims.scope]
            },
        });
    }, []);

    const refreshToken = useCallback(
        () => {

            if (isRequireRefresh(sessionStorage.getItem('accessToken'))) {


            }

            const data = {
                client_id: 'admin',
                client_secret: '123123',
                grant_type: 'refresh_token',
                refresh_token: sessionStorage.getItem('refreshToken')
            };

            axios.post(
                API_ENDPOINTS.auth.login,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': undefined
                    }
                }
            ).then(({data: {access_token, refresh_token, id_token}}) => {
                setAccessTokenSession(access_token);
                setRefreshTokenSession(refresh_token)
                setIdTokenSession(id_token)
            }).catch(err => {
                console.error(err)
            })

        },
        []
    )

    // REGISTER
    const register = useCallback(
        async (email, password, firstName, lastName) => {

            const response = {
                data: {
                    accessToken: '123',
                    user: {
                        id: 1,
                        name: 'John Doe',
                    },
                },
            };

            const {accessToken, user} = response.data;

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
        const accessToken = sessionStorage.getItem('accessToken');
        setAccessTokenSession(null)
        setRefreshTokenSession(null);
        setIdTokenSession(null);
        if (accessToken) {
            const data = {
                'token': accessToken,
                'token_type_hint': 'access_token',
                'client_id': 'admin',
                'client_secret': '123123',
            }

            axios.postForm(
                API_ENDPOINTS.auth.revoke,
                data,
                {
                    headers: {
                        'authorization': '',
                    }
                }
            )
        }
        dispatch({
            type: operationTypes.LOGOUT,
        });
    }, []);

    // ----------------------------------------------------------------------

    const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

    // 刷新登录页
    // 第一次 正常渲染,此时checkAuthenticated=unauthenticated、status=loading，在AuthComsumer组件渲染Loading组件
    // 第二次 开始触发AuthProvider的effect副作用，通过dispatch方式完成INITIAL，再次触发重新渲染，checkAuthenticated不一定更新、但是status必然更新
    // 第三次 AuthComsumer组件正常渲染children,进入GuestGuard组件,正常渲染JwtLoginPage组件,然后触发Effect函数，
    // checkAuthenticated=authenticated，则直接路由到首页
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
            refreshToken,
        }),
        [login, logout, register, refreshToken, state.user, status]
    );

    return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
