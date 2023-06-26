/** @type {import('next').NextConfig} */
const allowedDomains = process.env.NEXT_IMAGE_ALLOWED_DOMAINS;
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [allowedDomains],
    },
};

module.exports = nextConfig;
