module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@/common': './src/common',
            '@/components': './src/components',
            '@/services': './src/services',
            '@/screens': './src/screens',
            '@/navigation': './src/navigation',
            '@/assets': './src/assets',
          },
        },
      ],
      [
        'inline-import',
        {
          extensions: ['.svg'],
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
