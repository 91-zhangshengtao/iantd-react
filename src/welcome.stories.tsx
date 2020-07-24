import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 iantd-react-my 组件库</h1>
        <p>iantd-react-my only for test</p>
        <h3>安装试试</h3>
        <code>
          npm install iantd-react-my --save
        </code>
      </>
    )
  }, { info : { disable: true }})