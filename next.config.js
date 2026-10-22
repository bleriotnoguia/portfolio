/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next 16 only allows quality 75 unless other values are listed here.
    qualities: [75, 90],
  },
};

module.exports = nextConfig;
