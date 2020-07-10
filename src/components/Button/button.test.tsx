import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonType, ButtonSize } from './button'

/* test */
// test('first react test case', () => {
//   const wrapper = render(<Button>Nice</Button>)
//   const element = wrapper.getByText('Nice')
//   expect(element).toBeTruthy()
// })

const defaultProps = {
  onClick: jest.fn() // 创建一个被监控的模拟函数
}
const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}
/* describe分类 */
describe('test Button component', () => {
  // it/test 都可以 --测试用例
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>) // 获取元素
    const element = wrapper.getByText('Nice') as HTMLButtonElement // 断言类型
    expect(element).toBeInTheDocument() // element是否出现(是否在文档中)
    expect(element.tagName).toEqual('BUTTON') // 值相等
    expect(element).toHaveClass('btn btn-default') // className
    expect(element.disabled).toBeFalsy() // toBe false
    fireEvent.click(element) // 触发用户事件
    expect(defaultProps.onClick).toHaveBeenCalled() // 事件是否被调用
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType='link' href="http://dummyurl">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy() // 断言类型后 才有disabled属性
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled() // 事件不被调用触发
  })
})