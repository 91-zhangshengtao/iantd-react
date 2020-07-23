import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, wait, createEvent } from '@testing-library/react'

import { Upload, UploadProps } from './upload'
import { UploadFile } from './upload'
// 模拟<Icon icon="spinner" spin theme="primary" />
jest.mock('../Icon/icon', () => {
  return ({icon, onClick}) => {
    return <span onClick={()=>{onClick}}>{icon}</span>
  }
})
// 异步测试
/* jest接管axios --jest官网Mock functions栏 */
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios> // axios断言 JestMock对象

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}
let wrapper: RenderResult
let fileInput: HTMLInputElement
let uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement  // type="file"的input框
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper
    // 写法1 
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    // 写法2 
    mockedAxios.post.mockResolvedValue({'data': 'cool'}) // mockedAxios 为axios断言 的 JestMock对象
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile ]}}) // 触发用户事件
    expect(queryByText('spinner')).toBeInTheDocument()
    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile) // 事件是否被调用

    //remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times') as any)
    
    // expect(queryByText('test.png')).not.toBeInTheDocument()
    // -----objectContaining --包含对象是否包含xx属性-----
    // expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
    //   raw: testFile,
    //   status: 'success',
    //   name: 'test.png'
    // }))
  })
  it('drag and drop files should works fine', async () => {
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    /* mockDropEvent 用如下方法 --底层JSDOM 未支持dataTransfer   */
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)

    await wait(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
  })
})