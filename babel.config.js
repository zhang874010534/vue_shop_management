const prodPlugins=[]
if(process.env.NODE_ENV==='production'){
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 在这里用展开运算符放入
    // ...prodPlugins
  ]
}
