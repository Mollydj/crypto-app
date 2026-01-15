import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.ENV === 'DEV' ? '' : import.meta.env.SERVER_URL,
});

export default api;
