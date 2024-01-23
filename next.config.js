/** @type {import('next').NextConfig} */
const allowedDomains = process.env.NEXT_IMAGE_ALLOWED_DOMAINS
console.log(allowedDomains)
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "images.unsplash.com",
            "motortudo.com",
            "www.webmotors.com.br",
        ],
    },
}

module.exports = nextConfig
