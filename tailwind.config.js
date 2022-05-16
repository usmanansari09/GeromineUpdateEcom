module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        neueBold: ['NeueHaasDisplay-Bold'],
        neueBoldItalic: ['NeueHaasDisplay-BoldItalic'],
        neueRoman: ['NeueHaasDisplay-Roman'],
        neueRoamItalic: ['NeueHaasDisplay-RomanItalic'],
        RobotoBold: ['Roboto-Bold'],
      },
      colors: {
        brand: {
          primary: '#ED1A8E',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
