import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  /* Context */
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index // 1-1 3-1
  })
  // 父组件click事件
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index) // 调用父组件onSelect()
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem