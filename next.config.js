const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.extensions = ['.ts','.tsx','.js','.jsx',...config.resolve.extensions]
    return config
  },
})