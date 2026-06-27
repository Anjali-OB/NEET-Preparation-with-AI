/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.extensions = ['.ts','.tsx','.js','.jsx',...config.resolve.extensions]
    return config
  },
}
