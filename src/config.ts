
const {
    VERSION: version,
    BUILD_DATE: buildDate,
    VCS_REF: vcsRef,
    DB_URL: dbUrl,
    APP_SECRET: secret,
    DIGEST_IMAGE: digestImage = 'undefined',
    NODE_ENV: nodeEnv,
 } = process.env;

export default (): unknown => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    jwt_ttl: 900,    
    typeorm_type: dbUrl.split('://')[0],
    typeorm_url: dbUrl,
    secret,
    version,
    buildDate,
    vcsRef,
    digestImage,
    nodeEnv,
});
