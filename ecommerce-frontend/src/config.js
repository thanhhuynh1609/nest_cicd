const config = {
  API_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : 'http://3.27.240.73:3001/api'
};

export default config;
