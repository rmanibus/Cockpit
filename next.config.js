module.exports = {
  distDir: "../../../target/next",
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*' // Proxy to Backend
      }
    ]
  }
};