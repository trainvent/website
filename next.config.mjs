/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
      },
    ],
  },

  // Specify the path if your app is not deployed at the root of your domain.
  // BASE_PATH=/repo-name npm run build

  // Emit directory-style routes so static hosts like github Pages can serve
  // `/en/` from `out/en/index.html`.
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`. Remember to update
  // it in .github-ci.yml as well.
  // distDir: 'dist',
};

export default nextConfig;
