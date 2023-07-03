import axios from 'axios';
import { BASE_API_URL } from '../config';

const axiosCustomInstance = axios.create({
    baseURL: BASE_API_URL
});


axiosCustomInstance.interceptors.request.use(req => {
        
        return req;
    },
    err => {
        return Promise.reject(err);
    },
);

axiosCustomInstance.interceptors.response.use(res => {
        return res;
    },
    err => {
        console.log('this is an error', err)
        return Promise.reject(err);
    },
);




export default axiosCustomInstance;