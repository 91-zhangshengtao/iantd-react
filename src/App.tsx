import React from 'react'
import './styles/index.scss'
import TransMenu from './components/Menu'
import Icon from './components/Icon'
import { MenuProps } from './components/Menu/menu' // TransMenu.Item  TransMenu.SubMenu
/* fontawesome --Explicit Import */
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
/* fontawesome --Build a Library */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // fas 所有类型集合
import { fab, faAirbnb } from '@fortawesome/free-brands-svg-icons' // fab 所有类型集合
// library.add(aCheckSquare, faCoffee)
library.add(fas, fab)

function App () {
  const testProps: MenuProps= {
    defaultIndex: '4',
    // mode: 'vertical',
    onSelect: (index)=>{alert(`自定义onSelect事件${index}`)
    },
    className: 'test',
    defaultOpenSubMenus: ['4']

  }
  return (
    <div className="App">
      {/* icon --theme是是自己封装的控制颜色  */}
      <div>
        {/* 用Explicit Import */}
        <Icon icon={faCoffee} size="5x" theme="success"></Icon>
        <Icon icon={faCoffee} size="lg" theme="info"></Icon>
        <Icon icon={faAirbnb} size="10x" theme="info"></Icon>

        {/* 用libary */}
        <Icon icon="coffee" size="10x" theme="danger"></Icon>
        <Icon icon={['fas','coffee']} size="6x" theme="secondary"></Icon>
        <Icon icon={['fab','airbnb']} size="6x" theme="warning"></Icon>

      </div>
      {/* Menu */}
      <div>
        <TransMenu {...testProps} mode='vertical'>
          <TransMenu.Item>
            active
          </TransMenu.Item>
          <TransMenu.Item disabled>
            disabled
          </TransMenu.Item>
          <TransMenu.Item>
            xyz
          </TransMenu.Item>
          <TransMenu.SubMenu title="dropdown">
            <TransMenu.Item>
              drop1
            </TransMenu.Item>
            <TransMenu.Item>
              drop2
            </TransMenu.Item>
            <TransMenu.Item>
              drop3
            </TransMenu.Item>
          </TransMenu.SubMenu>
          <TransMenu.SubMenu title="opened">
            <TransMenu.Item>
              opened1
            </TransMenu.Item>
            <TransMenu.Item>
              opened2
            </TransMenu.Item>
          </TransMenu.SubMenu>
          <TransMenu.SubMenu title="abc">
            <TransMenu.Item>
              abc1
            </TransMenu.Item>
            <TransMenu.Item>
              abc2
            </TransMenu.Item>
          </TransMenu.SubMenu>
        </TransMenu>
      
      </div>
      <div>
        <TransMenu
          defaultIndex="0"
          defaultOpenSubMenus={[]}
          mode="horizontal"
          onSelect={function(index){alert(index)}}
        >
          <TransMenu.Item>
            cool link
          </TransMenu.Item>
          <TransMenu.Item>
            cool link 2
          </TransMenu.Item>
          <TransMenu.Item disabled>
            disabled
          </TransMenu.Item>
          <TransMenu.SubMenu title="下拉选项">
            <TransMenu.Item>
              下拉选项一
            </TransMenu.Item>
            <TransMenu.Item>
              下拉选项二
            </TransMenu.Item>
          </TransMenu.SubMenu>
        </TransMenu>
      </div>
      
    </div>
  )
}

export default App
