const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://icoud.onrender.com/api'
    : 'http://localhost:8080/api'
};

export default config;