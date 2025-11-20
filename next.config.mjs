/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
      remotePatterns:[
        { hostname: 'images.app.goo.gl' },
        { hostname: 'res.cloudinary.com' },
      ]
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;


