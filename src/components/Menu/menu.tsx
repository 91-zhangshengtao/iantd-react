import React, { FC, useState, createContext, CSSProperties } from 'react'
import * as PropTypes from 'prop-types';
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
// 类型别名 --字面量定义 
type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
  defaultIndex?: string; // 默认 active 的菜单项的索引值
  className?: string;
  mode?: MenuMode; // 菜单类型 横向或者纵向
  style?: CSSProperties;
  onSelect?: (selectedIndex: string) => void; // 点击菜单项触发的回掉函数
  defaultOpenSubMenus?: string[]; // 设置子菜单的默认打开 只在纵向模式下生效
}
interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void; // function
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];  
}
/* Context */
export const MenuContext = createContext<IMenuContext>({index: '0'}) //初始值 {index: '0'}
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'vikingship'
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  // useState
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  // click事件
  const handleClick = (index: string) => {
    setActive(index)
    // 自定义onSelect事件 --props传入的
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  /* children */
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps> // 断言类型
      const { displayName } = childElement.type // MenuItem.displayName = 'MenuItem'
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal', // 横向
  defaultOpenSubMenus: [],
}
// Menu.propTypes = {
//   mode:  PropTypes.oneOf<MenuMode>(['horizontal', 'vertical']),
// }

export default Menu;