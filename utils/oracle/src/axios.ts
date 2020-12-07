import axios from '../front-end/src/src/axios';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export { axios };
export * from '../front-end/src/src/axios';
