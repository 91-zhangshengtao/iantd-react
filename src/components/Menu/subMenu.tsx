import React,{ useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className}) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>


  // 'vertical' 纵向
  const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  // 拿Context中index
  let tem_Index1 = index as String
  let tem_Index2 = context.index as String
  // 1-1 3-1 ==> 1 3
  let subIndex1 = tem_Index1.split('-')[0]
  let subIndex2 = tem_Index2.split('-')[0]
  console.log('subIndex1, subIndex2：', subIndex1, subIndex2)
  const [ menuOpen, setOpen ] = useState(isOpend)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': subIndex1 === subIndex2,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  /* hover事件 */
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
  } : {}
  /* children */
  /*<Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
    </Menu>
  */
 /*
    <ul className="viking-menu menu-vertical/menu-horizontal">
      <li className="menu-item is-disabled is-active">item11</li>

      <li className="menu-item submenu-item is-active is-opened is-vertical">
        <div className="submenu-title">title</div> 
        <ul className="viking-submenu menu-opened">
          <li>item21</li>
          <li className="menu-item is-disabled is-active">item22</li>
        </ul>
      </li>
    </ul>
 */
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}` // '1-1'
        })
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation="zoom-in-top"
        wrapper={false}
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu