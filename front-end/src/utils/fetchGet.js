import { getLocalStorage } from './localStorage';

const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

const fetchGet = (endpoint) => ({
  method: 'get',
  url: `${baseUrl}${endpoint}`,
  headers: { Authorization: getLocalStorage('user')?.token },
});

export default fetchGet;
