/** @type {import('next').NextConfig} */

// increase size of input files for easy use for our users
// module.exports = {
//     experimental: {
//       serverActions: {
//         bodySizeLimit: '200mb',
//       },
//     },
//   }

  module.exports = {
    reactStrictMode: true,
    experimental: {
        serverActions: {
            bodySizeLimit: '200mb',
        },
    },
};
