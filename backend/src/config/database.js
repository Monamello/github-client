module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'github_client_admin',
    password: 'github_client_password',
    database: 'github_client',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  };