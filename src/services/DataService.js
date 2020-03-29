import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default {
  getEvents() {
    return apiClient.get('/events');
  },
  getEvent(id) {
    return apiClient.get('/events/' + id);
  },
  getResults(params) {
    return apiClient.post('/api/result', params);
  },

  getGraph() {
    return apiClient.get('/res');
  }
};
