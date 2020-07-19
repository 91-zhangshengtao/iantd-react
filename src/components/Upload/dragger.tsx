import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [ dragOver, setDragOver ] = useState(false) // 初始化拖拽状态 false
  const klass = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver
  })
  // 拖拽事件
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files) // 拿到fileList 调用父组件onFile方法
  }
  // 拖拽移动事件 拖进/拖出
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault() // 阻止浏览器默认行为
    setDragOver(over)
  }
  return (
    /* 　
      ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
　　　 ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
　　　 ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
　　　 ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
    */
    <div 
      className={klass}
      onDragOver={e => { handleDrag(e, true)}}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger;