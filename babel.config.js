module.exports = {
  presets: ['next/babel', '@babel/preset-flow'],
  plugins: [
    '@babel/plugin-syntax-flow',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-default-from',
    'transform-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
  ],
}
