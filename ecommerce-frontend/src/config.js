const config = {
  API_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : 'https://icoud.onrender.com/api'
};

export default config;
