/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            's.tmimgcdn.com', // Add this
            'm.media-amazon.com',
            'lh3.googleusercontent.com',
            's.tmimgcdn.com'
        ],
    },
    experimental: {
        legacyBrowsers: false, // disables support for IE11
    },
};

export default nextConfig;
