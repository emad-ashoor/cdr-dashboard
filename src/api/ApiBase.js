import axios from 'axios';

/*const { NODE_ENV } = process.env;
const { REACT_APP_BASE_URL } = process.env;

let apiBaseUrl;

if(NODE_ENV === 'development')
    apiBaseUrl = `${REACT_APP_BASE_URL}/api`;
else if (NODE_ENV === 'production')
    apiBaseUrl = `${window.BASE_URL}/api`;*/
const apiBaseUrl = `${process.env.REACT_APP_BASE_URL}/api`;

const ApiCaller = axios.create({ baseURL: apiBaseUrl });

function setAuthToken(token) {
    ApiCaller.defaults.headers['Cache-Control'] = 'no-cache';
    ApiCaller.defaults.headers.Pragma = 'no-cache';
    ApiCaller.defaults.headers.Authorization = token ? `Bearer ${token}` : '';
  }

export { ApiCaller, setAuthToken };