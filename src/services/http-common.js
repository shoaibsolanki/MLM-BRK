import axios from 'axios'


export const BASEURL = {
    ENDPOINT_URL:"http://103.148.165.246:8088/test/api/v1",
 }
//  helpkaroprdapi.helpkaro.co.in
//  export const BASEURL = {
//     ENDPOINT_URL:"http://103.139.58.166:8088/prod/api/v1",
//  }
export const authToken = localStorage.getItem('token');

export default axios.create({
    baseURL: `${BASEURL.ENDPOINT_URL}`,
    headers: {
        'Content-Type': 'application/json',
         "Authorization":`Bearer ${authToken}`
     }
});
