import axios from 'axios';
import { toast } from 'react-toastify';

//define an instance from Axios and set headers and baseurl => because we are using proxy we can't set base url

let axiosInstance = axios.create({
    timeout: 5000,
    baseURL: process.env.REACT_APP_BASE_API,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept-Language': 'fa'
    }
})
axiosInstance.interceptors.response.use(null, (error) => {
    if (error.response.status === 500) {
        toast.error("خطا در ارتباط با سرور");
    }
    if (error.response.status === 400) {
        toast.error(error.response.data.error);
    }
    if (error.response.status === 404) {
        toast.error('داده ای یافت نشد');
    }
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        toast.error(error.response.data.error);
        if (window.location.pathname === '/login' || window.location.pathname === '/forbidden') {
            return
        } else {
            // window.location.href = '/login';
        }
    }
    if (error.response.status === 409) {
        toast.error(error.response.data.error);
    }
    if (error.response.status === 429) {
        toast.error(error.response.data.error);
    }

    return Promise.reject(error)
})

export default axiosInstance;