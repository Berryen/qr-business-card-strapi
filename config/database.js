module.exports = ({ env }) => ({
  connection: {
    client: env("DB_CONNECTION", "postgres"),
    connection: {
      host: env("DB_HOST", "127.0.0.1"),
      port: env.int("DB_PORT", 5432),
      database: env("DB_DATABASE"),
      user: env("DB_USERNAME", "postgres"),
      password: env("DB_PASSWORD", "postgres"),
      ssl: env("DB_SSL_CERT")
        ? {
            ca: env("DB_SSL_CERT"),
            rejectUnauthorized: false,
          }
        : false,
    },
    acquireConnectionTimeout: 1000000,
    pool: {
      min: 0,
      max: 5,
      acquireTimeoutMillis: 300000,
      createTimeoutMillis: 300000,
      destroyTimeoutMillis: 300000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 2000,
    },
    debug: false,
  },
});
