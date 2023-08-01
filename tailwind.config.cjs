/** @type {import('tailwindcss').Config} */
// 字号，使用 App.vue 中的 --x-font-size 样式变量配置

module.exports = {
  corePlugins: {
    // 预设样式
    preflight: false, // 一般uniapp都有预设样式，所以不需要tailwindcss的预设

    // 以下功能小程序不支持
    // space: false, // > 子节点选择器
    // divideWidth: false,
    // divideColor: false,
    // divideStyle: false,
    // divideOpacity: false,
  },

  // 指定要处理的文件
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    // fontSize(config) {
    //   const list = ['2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl'];
    //   let result = {}
    //   list.forEach(it => {
    //     result[it] = `var(--font-size-${it})`
    //   })
    //   return result
    // },
    extend: {
      // spacing(config) {
      //   let result = { 0: '0' }
      //   // 允许的数值大一些也无所谓，最后打包tailwindcss会摇树优化，未使用的样式并不会打包
      //   for (let i = 1; i <= 750; i++) {
      //     result[i] = `${i}rpx`
      //   }
      //   return result
      // },
      // 增加颜色板，现在主流UI组件库大都是采用css变量实现定制主题，所以这里引用了全局的css变量，这个css变量的定义位置可以在 App.vue 中 page{} 选择器下
      // 其实tailwindcss只是一个css工具，不必局限于它内部提供的东西，灵活运用css变量这些特性完全可以整合出自己的生产力工具
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
      colors: {
        'primary': 'rgb(230, 0, 0)',
        'success': 'rgb(82, 196, 26)',
        'warning': 'rgb(254, 147, 31)',
        'error': 'rgb(230, 0, 0)',
      },
    },
  },
  plugins: [],
}