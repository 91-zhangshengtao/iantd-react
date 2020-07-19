import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList' // 进程Progress list 组件
import Dragger from './dragger'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
// file 接口( 原来就File类型, 需要自定义拓展类型)
export interface UploadFile {
  uid: string;
  /** 大小 */
  size: number;
  name: string;
  /** file上传状态 */
  status?: UploadFileStatus;
  /** 百分比 */
  percent?: number;
  /** 原file */
  raw?: File;
  response?: any;
  error?: any;
}
// Upload组件 接口
export interface UploadProps {
  /** 接口发送到哪个接口 */
  action: string;
  /** 默认 file自定义拓展的类型 */
  defaultFileList?: UploadFile[];
  /** 上传前 */
  beforeUpload? : (file: File) => boolean | Promise<File>;
  /** 上传进程 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败 */
  onError?: (err: any, file: File) => void;
  /** file change 事件 */
  onChange?: (file: File) => void;
  /** file remove 事件 */
  onRemove?: (file: UploadFile) => void;
  /** 添加自定义header */
  headers?: {[key: string]: any };
  /** 添加自定义name --代表发到后台的文件参数名称 */
  name?: string;
  /** 添加自定义post formData */
  data?: {[key: string]: any };
  /** 是否携带cookie */
  withCredentials?: boolean;
  /** 限制文件类型 */
  accept?: string;
  /** 是否支持上传多个文件 */
  multiple?: boolean;
  /** 是否拖拽文件 */
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props

  /* useRef */
  const fileInput = useRef<HTMLInputElement>(null)

  /* useState */
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || []) // 自定义拓展的file类型(为了进度条取值)

  /* 更新file信息 事件
     - Partial<UploadFile> --可选
     - useState里 可以传function ()=>{return []}  --返回新对象
  */
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  // click 事件( js代码实现点击<input type='file' /> )
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  // file-change 事件
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(!files) {
      return
    }
    uploadFiles(files) // 上传文件
    if (fileInput.current) {
      fileInput.current.value = '' // 初始化清空
    }
  }
  // file-remove 事件
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    // 再调用 用户定义的remove事件
    if (onRemove) {
      onRemove(file)
    }
  }
  // file-upload 事件(文件上传会post请求多次)
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files) // 转Array类型
    postFiles.forEach(file => {
      // 判断beforeUpload事件(外面传进来的 props接收的)
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        // 判断result是个Promise
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  /* post上传文件 */
  const post = (file: File) => {
    // 自定义拓展的file类型
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    
    /* 合并fileList(合并先前的)
       - fileList setFileList --useState
       - useState里 可以传function解决异步问题  ()=>{return []}
    */
    // 解决异步问题
    setFileList(prevList => {
      return [_file, ...prevList]
    }) 
    const formData = new FormData()
    // ------name， data是外部传入的 props接收-------------
    formData.append(name || 'file', file)  // name--代表发到后台的文件参数名称
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    } 

    // api
    axios.post(action, formData, {
      headers: {
        ...headers, // 外部headers
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: withCredentials, // 是否携带cookie
      // 上传进度(axios里自带的,下面照写就行)
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        console.log('onUploadProgress：',percentage)
        
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading'})
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then(resp => {
      updateFileList(_file, {status: 'success', response: resp.data})
      if (onSuccess) {
        onSuccess(resp.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    }).catch(err => {
      updateFileList(_file, { status: 'error', error: err})
      if (onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      }
    })
  }

  return (
    <div 
      className="viking-upload-component"
    >
      <div className="viking-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick} // click
      >
          {/* 拖拽 --onFile：drop upload file 事件 */}
          {drag ? 
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>:
            children
          }
        <input
          className="viking-file-input"
          style={{display: 'none'}}
          ref={fileInput} // useRef
          onChange={handleFileChange}
          type="file" // type = 'file'
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList 
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}
export default Upload;