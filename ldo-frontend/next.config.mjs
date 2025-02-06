/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["192.168.0.62"], // Add the hostname(s) of your images here
        unoptimized: true
    },
    async rewrites() {
        return [
            // First address for API routes starting with /api/v1
            {
                source: "/api/v1/:path*",
                destination: "http://192.168.0.62:8080/api/v1/:path*"
            },
            // Second address for API routes starting with /api/v2
            {
                source: "/api/v2/:path*",
                destination: "http://192.168.0.62:30/api/v2/:path*"
            }
        ];
    },
    compiler: {
        styledComponents: {
            cssProp: true
        }
    },
    reactStrictMode: false
};

export default nextConfig;
