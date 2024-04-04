module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/python/:path*',
        destination: 'http://127.0.0.1:6969/:path*', // Proxy to Backend
      },
    ]
  },
}