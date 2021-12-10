import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://192.168.2.4:8082/api/mobile/',
  //baseURL: 'http://192.168.237.64:8082/api/mobile/',
  baseURL: 'https://inqhome.herokuapp.com/api/mobile/',
});

export default api;