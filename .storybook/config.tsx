import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// 使components组件内的样式生效
import "../src/styles/index.scss"
library.add(fas)

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}
// 装饰story(样式)
const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
)

// 装饰story
addDecorator(storyWrapper)
addDecorator(withInfo) // withInfo作用：丰富story的info信息
addParameters({info: { inline: true, header: false}}) // {info: }: 丰富story的info信息
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);
