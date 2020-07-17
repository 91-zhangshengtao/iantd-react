import React,{useState, useEffect} from 'react'
import './styles/index.scss'
import axios from 'axios'
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
   
  return (
    <div className="App" style={{paddingLeft:"0px",paddingTop:"10px"}}>
      <div>
        <h1>title: {title}</h1>
      </div>
      <div>
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
      <div>
          <h1>Upload 组件</h1>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={file=>console.log('onChange:',file)}
            onSuccess={(data,file)=>console.log('onSuccess:', data, file)}
            onError={(error,file)=>console.log('onError:', error, file)}
            onRemove={file=>console.log('onRemove:',file)}
            name="fileName1"
            multiple
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
