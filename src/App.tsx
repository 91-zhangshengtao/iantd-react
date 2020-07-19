import React,{useState, useEffect} from 'react'
import './styles/index.scss'
import axios from 'axios'

import Progress from './components/Progress'
import  Upload  from './components/Upload'
import  Icon  from './components/Icon'
/* fontawesome --Build a Library */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // fas 所有类型集合
import { fab, faAirbnb } from '@fortawesome/free-brands-svg-icons' // fab 所有类型集合
// library.add(aCheckSquare, faCoffee)
library.add(fas, fab)


const App: React.FC = () => {
  const[title,setTitle] = useState('')
  useEffect(()=>{
    async function awaitFunction() {
      try {
        const res = await axios.get('http://jsonplaceholder.typicode.com/posts?userId=1',{
          headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
        console.log('res:',res)
        setTitle(res.data[1].title)
      } catch (error) {
        console.log(error)
      }
    }
    awaitFunction()
  }, [])

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) =>{
    try {
      const files = e.target.files
      if(files){
        const uploadedFile = files[0]
        const formData = new FormData() // xhr2
        formData.append(uploadedFile.name, uploadedFile)
        // api
        const res = await axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        })
        console.log('file-res:',res)
        
      }

    } catch (error) {
      console.log(error)
    }
    
  }
  /* beforeUpload 事件 */
  // boolean
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false
    }
    return true
  }
  // Promise<File>
  // 重命名
  const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', {type: file.type})
    return Promise.resolve(newFile)
  }

  return (
    <div className="App" style={{padding:"10px 10px",width:"800px"}}>
      <div>
        <h1>title: {title}</h1>
      </div>
      <div style={{border:"1px solid #ccc"}}>
        <h1>Process组件</h1>
        <div>
          <Progress 
            percent={30 || 0}
            strokeHeight={15} // bar高度
            showText={true}
            // styles?: React.CSSProperties;
            theme="info"
          />
        </div>
      </div>
      <div style={{border:"1px solid #ccc"}}>
          {/* 1. form表单文件上传  */}
          <h1>form表单文件上传</h1>
          <form encType="multipart/form-data" action="https://jsonplaceholder.typicode.com/posts" method="post">
              <input type="file" name="file" />
              <input type="submit" value="Upload" />
          </form>

          {/* 2. 不借助form的js文件上传  */}
          <h1>借助js文件上传</h1>
          <input type="file" name="file" onChange={handleFileChange} />
      </div>
      <div style={{border:"1px solid #ccc"}}>
          <h1>非拖拽 Upload 组件 </h1>
          {/*
            const props = {
              // 接口发送到哪个接口 
              action: string;
              // 默认 file自定义拓展的类型
              defaultFileList?: UploadFile[];
              // 上传前 
              beforeUpload? : (file: File) => boolean | Promise<>;
              // 上传进程 
              onProgress?: (percentage: number, file: File) => void;
              // 上传成功
              onSuccess?: (data: any, file: File) => void;
              // 上传失败 
              onError?: (err: any, file: File) => void;
              // file change 事件
              onChange?: (file: File) => void;
              // file remove 事件
              onRemove?: (file: UploadFile) => void;
              // 添加自定义header  --如{'Content-Type': 'multipart/form-data'}
              headers?: {[key: string]: any };
              // 添加自定义name --代表发到后台的文件参数名称
              name?: string;
              // 添加自定义post formData
              data?: {[key: string]: any };
              // 是否携带cookie
              withCredentials?: boolean;
              // 限制文件类型
              accept?: string;
              // 是否支持上传多个文件
              multiple?: boolean;
              // 是否支持拖拽
              drag?: boolean;
            }
          */}
          <Upload
            // headers={{'Content-Type': 'multipart/form-data'}}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={file=>console.log('onChange:',file)}
            onSuccess={(data,file)=>console.log('onSuccess:', data, file)}
            onError={(error,file)=>console.log('onError:', error, file)}
            onRemove={file=>console.log('onRemove:',file)}
            // beforeUpload={checkFileSize} // checkFileSize / filePromise
            name="fileName112233"
            multiple
            // accept="image/*"
            // drag
          >
            上传
        </Upload>
      </div>

      <div style={{border:"1px solid #ccc"}}>
        <h1>拖拽情况 Upload组件</h1>
        <Upload
            // headers={{'Content-Type': 'multipart/form-data'}}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={file=>console.log('onChange:',file)}
            onSuccess={(data,file)=>console.log('onSuccess:', data, file)}
            onError={(error,file)=>console.log('onError:', error, file)}
            onRemove={file=>console.log('onRemove:',file)}
            // beforeUpload={checkFileSize} // checkFileSize / filePromise
            name="fileName112233"
            multiple
            // accept="image/*"
            drag
          >
            <Icon icon="upload" size="5x" theme="secondary" />
            <br/>
            <p>Drag file over to upload</p>
        </Upload>
      </div>
      
    </div>
  )
}

export default App
