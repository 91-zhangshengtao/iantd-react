## Iantd-react-my component library

[文档地址](https://91-zhangshengtao.github.io/iantd-react/) 

### 安装依赖

~~~javascript
npm install iantd-react-my --save
~~~

### 使用

~~~javascript
// 加载样式
import 'iantd-react-my/dist/index.css'
// 引入组件
import { Button, Upload, AutoComplete} from 'iantd-react-my'

~~~

~~~jsx
/* Button*/
<Button btnType="danger" size="lg">按钮</Button>
<Button disabled size="sm">按钮</Button>

/* AutoComplete: */
<AutoComplete 
  style={{width:"300px"}}
  fetchSuggestions={handleFetch}
  onSelect={e => alert(`${e.value}  selected`)}
/>
const handleFetch = (query: string) => {
  let MockData =  [
      {value: 'bradley', number: 11},
      {value: 'pope', number: 1},
      {value: 'caruso', number: 4},
      {value: 'cook', number: 2},
      {value: 'cousins', number: 15},
      {value: 'james', number: 23},
      {value: 'AD', number: 3},
      {value: 'green', number: 14},
      {value: 'howard', number: 39},
      {value: 'kuzma', number: 0},
    ]
    return MockData.slice(0, 10).filter((item: any) => item.value.indexOf(query) > -1)
}

/* UpLoad */
<Upload
  // headers={{'Content-Type': 'multipart/form-data'}}
  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  onChange={file=>console.log('onChange:',file)}
  onSuccess={(data,file)=>console.log('onSuccess:', data, file)}
  onError={(error,file)=>console.log('onError:', error, file)}
  onRemove={file=>console.log('onRemove:',file)}
  // beforeUpload={} 
  name="fileName112233"
  multiple
  accept="image/*"
  // drag
>
    <Button btnType="primary" size="sm">上传文件</Button>
</Upload>

~~~

### 一些本地开发命令

~~~bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~