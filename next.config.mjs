// import { fileURLToPath } from "url";
// import { dirname, resolve } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'upload.wikimedia.org',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'cdn-icons-png.flaticon.com',
//         pathname: '/**',
//       },
//     ],
//   },
//   experimental: {
//     serverComponentsExternalPackages: ["mongoose"],
//   },
//   env: {
//     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dikhyqnzw",
//     NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "mgfoler1",
//   },
//   webpack: (config) => {
//     config.resolve.alias["@"] = resolve(__dirname);
//     config.resolve.alias["@/utils"] = resolve(__dirname, "utils");
//     config.resolve.alias["@/utils/models"] = resolve(
//       __dirname,
//       "utils",
//       "models"
//     );
//     return config;
//   },
//   async headers() {
//     return [
//       {
//         source: "/api/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET,DELETE,PATCH,POST,PUT",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value:
//               "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

/* Re-create __dirname for ES module support */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        pathname: "/**",
      },
    ],
  },

  // ✅ Updated here
  serverExternalPackages: ["mongoose"],

  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dikhyqnzw",
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "mgfoler1",
  },

  webpack: (config) => {
    config.resolve.alias["@"] = resolve(__dirname);
    config.resolve.alias["@/utils"] = resolve(__dirname, "utils");
    config.resolve.alias["@/utils/models"] = resolve(__dirname, "utils", "models");
    return config;
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

