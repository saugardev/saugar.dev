const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
}
 
module.exports = withMDX(nextConfig)