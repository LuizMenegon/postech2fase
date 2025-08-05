module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'myuser',
    password: process.env.DB_PASSWORD || 'mypassword',
    database: process.env.DB_NAME || 'welearn'
};