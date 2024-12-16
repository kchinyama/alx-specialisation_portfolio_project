/** @type {import('next').NextConfig} */

// increase size of input files for easy use for our users
module.exports = {
    experimental: {
      serverActions: {
        bodySizeLimit: '200mb',
      },
    },
  }