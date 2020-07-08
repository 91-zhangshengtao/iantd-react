import React from 'react'
import './styles/index.scss'
// import Button from './components/Button'
import TransMenu from './components/Menu'
import { MenuProps } from './components/Menu/menu'
// TransMenu.Item
// TransMenu.SubMenu

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
