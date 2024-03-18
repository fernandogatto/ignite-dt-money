import axios from 'axios';

const URLS = {
  baseUrl: `http://localhost:3000`,
}

export const api = axios.create({
  baseURL: URLS.baseUrl,
  timeout: 30000,
});
