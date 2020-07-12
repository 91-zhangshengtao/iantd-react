import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'

import Button from './button'

const defaultButton = () => (
  <Button onClick={action('clicked')}> default button </Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://baidu.com"> link button </Button>
  </>
)

// storyOfAPI方式
storiesOf('Button Component', module)
  // .addDecorator(withInfo)
  // .addParameters({info: {text:'Button Component', inline: true, header: false}})
  .add('Button', defaultButton) // 'Button'要与组件名一直，不然注释无法生成文档
  .add('不同尺寸的 Button', buttonWithSize, {info: { inline: false, header: false}}) // 第三个参数:丰富story的info信息(优先级比全局配置高)
  .add('不同类型的 Button', buttonWithType)