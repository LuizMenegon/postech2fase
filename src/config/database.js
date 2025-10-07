module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'database',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin123',
    database: process.env.DB_NAME || 'postech_blog',
    logging: process.env.NODE_ENV === 'production' ? false : console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};