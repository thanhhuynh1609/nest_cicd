const config = {
  API_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : 'http://54.252.205.252:3001/api'
};

export default config;
