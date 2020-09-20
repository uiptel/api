
export default (): unknown => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    secret: process.env.APP_SECRET,
    jwt_ttl: 900,
    typeorm_type: process.env.DB_URL.split('://')[0],
    typeorm_url: process.env.DB_URL,
});
