module.exports = {
  development: {
    dialect: 'postgres',
    host: 'postgres',
    username: 'github_client_admin',
    password: 'github_client_password',
    database: 'github_client',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    "use_env_variable": "DATABASE_URL",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};