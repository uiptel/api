
export default () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    secret: process.env.APP_SECRET,
    jwt_ttl: 900,
});
