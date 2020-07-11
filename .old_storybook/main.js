// import { configure, addDecorator, addParameters } from '@storybook/react';
// import { withInfo } from '@storybook/addon-info'
// import React from 'react'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import "../src/styles/index.scss"
// library.add(fas)
// const wrapperStyle: React.CSSProperties = {
//   padding: '20px 40px'
// }

// const storyWrapper = (stroyFn: any) => (
//   <div style={wrapperStyle}>
//     <h3>组件演示</h3>
//     {stroyFn()}
//   </div>
// )
// addDecorator(storyWrapper)
// addDecorator(withInfo)
// addParameters({info: { inline: true, header: false}})
// const loaderFn = () => {
//   const allExports = [require('../src/welcome.stories.tsx')];
//   const req = require.context('../src/components', true, /\.stories\.tsx$/);
//   req.keys().forEach(fname => allExports.push(req(fname)));
//   return allExports;
// };


// // automatically import all files ending in *.stories.js
// configure(loaderFn, module);




// import '../src/styles/index.scss'
module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    // do mutation to the config
    /* 支持ts */
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
