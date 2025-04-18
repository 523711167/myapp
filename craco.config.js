const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@auth': path.resolve(__dirname, 'src/auth'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@sections': path.resolve(__dirname, 'src/sections')
    },
  },
  style: {
    sass: {
      loaderOptions: {
        api: "modern"
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:18888',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ''
        }
      }
    },
  }
}; 