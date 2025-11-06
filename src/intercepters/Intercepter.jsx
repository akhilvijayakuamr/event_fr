import axios from "axios";
import { refreshTokenApi } from "../api/Api";
import { setUserAccessToken } from "../redux/slice";
import { store } from "../redux/store";




const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});


const headers = {
    'Content-Type': 'application/json',
}


apiClient.interceptors.request.use(function (config) {
    const token = store.getState().auth.user_access_token
    console.log("tokkken", token)
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('No token found in Redux store.');
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


apiClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            const refresh = store.getState().auth.user_refresh_token;
            const data = { refresh };
            if (refresh) {
                try {
                    const response  = await refreshTokenApi(data, headers)                
                    const newAccess = response.data.access     
                    const newRefresh = response.data.refresh
                    store.dispatch(setUserAccessToken({ access: newAccess, refresh: newRefresh }))
                    if (newAccess && error.config) {
                        error.config.headers['Authorization'] = `Bearer ${newAccess}`;
                        console.log(error.config.headers)
                        return apiClient.request(error.config);
                    }
                } catch (tokenError) {
                    console.error("Token refresh failed", tokenError);
                }
            }
        }

        return Promise.reject(error);
    }
);


export  {apiClient}