import axios from 'axios';

console.log(process.env.REACT_APP_ENVIRONMENT);

const trmsClient = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'local' ? 'http://localhost:5000' : process.env.TRMS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default trmsClient;
