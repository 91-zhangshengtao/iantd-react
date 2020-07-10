import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}
let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  /* 在case前先执行了，避免重复生成  --case完后会自动调用cleanup()删除dom节点 */
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile()) // 添加css
    menuElement= wrapper.getByTestId('test-menu') // 自定义属性 data-testid="test-menu" 【'./menu.tsx'】
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    // cleanup() // 手动删除dom节点

    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test') // test是自定义的
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5) // :scope指的是menuElement本身,:scope > li是指它本身下面的li
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem) // 触发click
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2') // 调用参数
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should show dropdown items when hover on subMenu', async () => {
    // queryByText() 可能会不存在  getByText() 一定存在的
    expect(wrapper.queryByText('drop1') as null ).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    // async await wait(()=>{})
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
})
describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = wrapper2.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(wrapper2.getByText('dropdown'))
    expect(dropDownItem).toBeVisible()
  })
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(wrapper2.queryByText('opened1')).toBeVisible()
  })
})