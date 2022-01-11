const path = require('path');

module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@': path.resolve(__dirname, './src/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@ui': path.resolve(__dirname, './src/components/ui/'),
      '@domain': path.resolve(__dirname, 'src/components/domain/'),
      '@function': path.resolve(__dirname, 'src/components/function/'),
      '@page': path.resolve(__dirname, 'src/components/page/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@db': path.resolve(__dirname, 'src/db/'),
      '@public': path.resolve(__dirname, 'public/'),
      '@assets': path.resolve(__dirname, 'public/assets/'),
    },
  };

  return config;
};
