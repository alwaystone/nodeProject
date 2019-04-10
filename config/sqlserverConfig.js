let app = {
  user: 'ways',
  password: 'admin',
  server: 'localhost',
  database: 'demo',
  port: 1433,
  options: {
   encrypt: true // Use this if you're on Windows Azure
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 3000
  }
};

module.exports = app;