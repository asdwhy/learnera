module.exports = {
    CORS_ORIGIN: 'http://your-website.com',
    COOKIE_OPTIONS: {
        httpOnly: true,
        sameSite: 'none'
    },
    CORS_ENABLED: false // change to true if server hosted cross-origin to the client content
}