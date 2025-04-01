import axios from 'axios';

import { HOST_API } from '@/config-global';



const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error)
        return Promise.reject(error.response?.data?.msg || '服务器开小差了')
    }
);

export default axiosInstance;

export const API_ENDPOINTS = {
    auth: {
        me: '/api/auth/me',
        login: '/api/yuyu-auth/oauth2/token',
        userinfo: '/api/yuyu-auth/userinfo',
    },
    mail: {
        list: '/api/mail/list',
        details: '/api/mail/details',
        labels: '/api/mail/labels',
    },
    user: {
        page: '/api/yuyu-api/user/page'
    }
};
