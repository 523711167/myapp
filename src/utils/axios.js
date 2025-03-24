import axios from 'axios';

import { HOST_API } from '@/config-global';



const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error)
        return Promise.reject(error.response?.data?.msg || '服务器内部错误')
    }
);

export default axiosInstance;

export const API_ENDPOINTS = {
    chat: '/api/chat',
    kanban: '/api/kanban',
    calendar: '/api/calendar',
    auth: {
        me: '/api/auth/me',
        login: '/api/yuyu-auth/oauth2/token',
        register: '/api/auth/register',
    },
    mail: {
        list: '/api/mail/list',
        details: '/api/mail/details',
        labels: '/api/mail/labels',
    },
    post: {
        list: '/api/post/list',
        details: '/api/post/details',
        latest: '/api/post/latest',
        search: '/api/post/search',
    },
    product: {
        list: '/api/product/list',
        details: '/api/product/details',
        search: '/api/product/search',
    },
};
