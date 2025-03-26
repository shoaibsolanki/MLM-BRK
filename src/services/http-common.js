import axios from 'axios';

export const BASEURL = {
    ENDPOINT_URL: "http://103.148.165.246:8088/test/api/v1",
};
//  helpkaroprdapi.helpkaro.co.in
//  export const BASEURL = {
//     ENDPOINT_URL:"http://103.139.58.166:8088/prod/api/v1",
//  }
export const authToken = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
};

if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
}

const axiosInstance = axios.create({
    baseURL: `${BASEURL.ENDPOINT_URL}`,
    headers: headers
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => {
        // Check the status code here
        console.log('Status Code:', response.status);
        return response;
    },
    error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Error Status Code:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.log('No response received');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
