const config = {
  API_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : 'http://13.239.246.186:3001/api'
};

export default config;
