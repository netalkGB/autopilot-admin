/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/autopilot/:path*',
        destination: process.env.NEXT_PUBLIC_AP_SERVER_URI + ':path*' // Proxy to Backend
      },
    ]
  },
}
